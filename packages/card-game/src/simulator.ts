import { GameRandoms, GameRng } from "@doggo/game-random";
import { GameCard, GameCardEffectDetails, GameCardSpawnDetails, GameEffect, GameEvent, GameEventKind, GameMatch, PlayerCommand, Unit } from "./model";
import { GameCardGenerator } from "./generator";

function shuffle<T>(
    arr: Array<T>,
    rng: GameRng
): void {

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

}

export class GameSimulator {

    constructor() {

    }

    public simulateMatch(
        player1Commands: Array<PlayerCommand>,
        player2Commands: Array<PlayerCommand>,
        matchSeed: number
    ): GameMatch {

        const rng = GameRandoms.cardGameSimulation(matchSeed);
        const cardGenerator = new GameCardGenerator();

        let planeIdSequence = 0;
        let eventIdSequence = 0;
        let events: Array<GameEvent> = [];
        let winnerPlayer: number = -1;
        let turnNumber = 1;
        let playingDeck: Array<PlayerCommand & { _player: number }> = [];
        // let playerOneUnits: Array<Unit> = [];
        // let playerTwoUnits: Array<Unit> = [];
        let units: Array<Unit> = [];
        let playedEffects: Array<GameEffect & { _player: number, _unit?: number }> = [];
        let deadUnits: Set<number> = new Set();
        let startingUnitSize = -1;
        let consecutiveTieRounds = 0;
        let spawnedPlayers: Set<number> = new Set();

        const $ev = (kind: GameEventKind, data: any, player?: number,) => {
            events.push({
                kind,
                player,
                data,
                sequence: eventIdSequence++,
                turn: turnNumber
            });
        };
        const $win = (player: number, reason?: string) => {
            winnerPlayer = player;
            $ev("win", {
                reason
            }, player);
        };
        const $addToPlayingDeck = (command: PlayerCommand, player: number) => {
            playingDeck.push({
                ...command,
                _player: player
            });
            $ev("add-to-playing-deck", {
                command
            }, player);
        };
        const $shufflePlayingDeck = () => {
            const cardsBefore = JSON.parse(JSON.stringify(playingDeck));
            shuffle(playingDeck, rng);
            const cardsAfter = JSON.parse(JSON.stringify(playingDeck));
            $ev("shuffle-playing-deck", {
                cardsBefore,
                cardsAfter
            });
        };
        const $unit = (id: number) => units.find(u => u.id === id)!;
        const $effectTargets = (effect: GameEffect, player: number, unit?: number) => {
            let targets: Array<Unit> = [];
            switch (effect.target) {
                case "this-plane": targets = [$unit(unit!)]; break;
                case "all-own-planes": targets = units.filter(u => u.owner === player); break;
                case "all-own-planes-of-kind": targets = units.filter(u => u.owner === player && u.kind === effect.targetKind); break;
                case "some-own-planes": targets = units.filter(u => u.owner === player).sort(() => rng() - 0.5).slice(0, effect.targetCount); break;
                case "some-own-planes-of-kind": targets = units.filter(u => u.owner === player && u.kind === effect.targetKind).sort(() => rng() - 0.5).slice(0, effect.targetCount); break;
                case "all-enemy-planes": targets = units.filter(u => u.owner !== player); break;
                case "all-enemy-planes-of-kind": targets = units.filter(u => u.owner !== player && u.kind === effect.targetKind); break;
                case "some-enemy-planes": targets = units.filter(u => u.owner !== player).sort(() => rng() - 0.5).slice(0, effect.targetCount); break;
                case "some-enemy-planes-of-kind": targets = units.filter(u => u.owner !== player && u.kind === effect.targetKind).sort(() => rng() - 0.5).slice(0, effect.targetCount); break;
                case "all-planes": targets = units; break;
                case "all-planes-of-kind": targets = units.filter(u => u.kind === effect.targetKind); break;
                case "some-planes": targets = units.sort(() => rng() - 0.5).slice(0, effect.targetCount); break;
                case "some-planes-of-kind": targets = units.filter(u => u.kind === effect.targetKind).sort(() => rng() - 0.5).slice(0, effect.targetCount); break;
                default: throw new Error(`Unknown effect target: ${effect.target}`);
            }
            return targets.filter(
                t => !!t && !deadUnits.has(t.id)
            );
        }
        const $activateEffect = (effect: GameEffect, player: number, unit?: number) => {

            const targets = $effectTargets(effect, player, unit);

            if (targets.length === 0) {
                return;
            }

            $ev("activate-effect", {
                effect: JSON.parse(JSON.stringify(effect)),
                targets: JSON.parse(JSON.stringify(targets)),
            }, player);

            switch (effect.kind) {
                case "direct-damage":
                    targets.forEach(t => {
                        t.hp -= effect.value;
                        $ev("change-hp", {
                            unit: JSON.parse(JSON.stringify(t)),
                            hpBefore: t.hp + effect.value,
                            hpAfter: t.hp
                        }, t.owner);

                        if (t.hp <= 0 && !deadUnits.has(t.id)) {
                            $kill(t);
                        }
                    });
                    break;
                case "direct-heal":
                    targets.forEach(t => {
                        if (deadUnits.has(t.id)) {
                            return;
                        }

                        t.hp += effect.value;
                        $ev("change-hp", {
                            unit: JSON.parse(JSON.stringify(t)),
                            hpBefore: t.hp - effect.value,
                            hpAfter: t.hp
                        }, t.owner);
                    });
                    break;
                case "affect-ap":
                    targets.forEach(t => {
                        if (deadUnits.has(t.id)) {
                            return;
                        }

                        t.ap += effect.value;
                        $ev("change-ap", {
                            unit: JSON.parse(JSON.stringify(t)),
                            apBefore: t.ap - effect.value,
                            apAfter: t.ap
                        }, t.owner);
                    });
                    break;
                case "affect-dp":
                    targets.forEach(t => {
                        if (deadUnits.has(t.id)) {
                            return;
                        }

                        t.dp += effect.value;
                        $ev("change-dp", {
                            unit: JSON.parse(JSON.stringify(t)),
                            dpBefore: t.dp - effect.value,
                            dpAfter: t.dp
                        }, t.owner);
                    });
                    break;
                case "affect-man":
                    targets.forEach(t => {
                        if (deadUnits.has(t.id)) {
                            return;
                        }

                        t.man += effect.value;
                        $ev("change-man", {
                            unit: JSON.parse(JSON.stringify(t)),
                            manBefore: t.man - effect.value,
                            manAfter: t.man
                        }, t.owner);

                    });
                    break;
                default: throw new Error(`Unknown effect kind: ${effect.kind}`);
            }

            $ev("end-effect-activate-consequences", {
                effect: JSON.parse(JSON.stringify(effect)),
                targets: JSON.parse(JSON.stringify(targets)),
            }, player);
        };
        const $play = (card: GameCard, player: number) => {
            $ev("play-card", {
                card
            }, player);

            if (card.kind === "spawn") {
                const spawnDetails = card.spawnDetails!;
                const spawnedUnits: Array<Unit> = [];
                const spawnEffectsToPlay: Array<GameEffect & { _player: number, _unit?: number }> = [];
                const spawnEffectsToActivate: Array<GameEffect & { _player: number, _unit?: number }> = [];
                for (let i = 0; i < spawnDetails.amount; i++) {
                    const unit: Unit = {
                        id: planeIdSequence++,
                        hp: spawnDetails.attributes.hp,
                        ap: spawnDetails.attributes.ap,
                        dp: spawnDetails.attributes.dp,
                        man: spawnDetails.attributes.man,
                        kind: spawnDetails.kind,
                        owner: player,
                        target: -1
                    };
                    $ev("spawn-unit", {
                        unit: JSON.parse(JSON.stringify(unit))
                    }, player);
                    units.push(unit);
                    spawnedUnits.push(unit);
                    spawnedPlayers.add(player);

                    for (let effect of spawnDetails.effects) {
                        // Effects with the "Spawn" activation are activated here
                        // Every other effect goes to the played effects list
                        if (effect.trigger === "on-spawn") {
                            spawnEffectsToActivate.push({
                                ...JSON.parse(JSON.stringify(effect)),
                                _player: player,
                                _unit: unit.id
                            });
                        } else {
                            spawnEffectsToPlay.push({
                                ...JSON.parse(JSON.stringify(effect)),
                                _player: player,
                                _unit: unit.id
                            });
                        }
                    }
                }
                $ev("spawn-n-units", {
                    units: JSON.parse(JSON.stringify(spawnedUnits))
                }, player);

                for (let effect of spawnEffectsToActivate) {
                    $activateEffect(effect, player);
                }

                for (let effect of spawnEffectsToPlay) {
                    $ev("play-effect", {
                        effect: JSON.parse(JSON.stringify(effect))
                    }, player);
                    playedEffects.push({
                        ...JSON.parse(JSON.stringify(effect)),
                        _player: player
                    });
                }
            } else if (card.kind === "effect") {
                const effectDetails = card.effectDetails!;
                for (const effect of effectDetails.effects) {
                    // Effects with the "Once" activation are activated here
                    // Every other effect goes to the played effects list
                    if (effect.trigger === "once") {
                        // Activate effect
                        $activateEffect(effect, player);
                    } else {
                        // Add to played effects list
                        $ev("play-effect", {
                            effect: JSON.parse(JSON.stringify(effect))
                        }, player);
                        playedEffects.push({
                            ...JSON.parse(JSON.stringify(effect)),
                            _player: player
                        });
                    }
                }
            }

            $ev("end-card-play", {
                card
            }, player);
        };
        const $unitTargetPhase = (unit: Unit) => {
            // Check if unit is still alive
            if (deadUnits.has(unit.id)) {
                return;
            }

            // Check if unit's target is still alive
            if (unit.target !== -1 && deadUnits.has(unit.target)) {
                unit.target = -1;
            }

            if (unit.target === -1) {
                // Find new random enemy target
                const enemyUnits = units.filter(u => u.owner !== unit.owner)
                    .filter(u => !deadUnits.has(u.id));
                if (enemyUnits.length > 0) {
                    const enemyUnit = enemyUnits[Math.floor(rng() * enemyUnits.length)];
                    unit.target = enemyUnit.id;
                    $ev("target-unit", {
                        unit: JSON.parse(JSON.stringify(unit)),
                        target: JSON.parse(JSON.stringify(enemyUnit))
                    }, unit.owner);
                }
            }
        };
        const $unitAttackPhase = (unit: Unit) => {
            // Check if unit is still alive
            if (deadUnits.has(unit.id)) {
                return;
            }

            // Check if unit has a target
            if (unit.target === -1) {
                return;
            }
            const targetUnit = units.find(u => u.id === unit.target)!;
            const damageRoll = 1 + Math.floor(rng() * 6);
            const damagePool = damageRoll * unit.ap;
            const evasionRoll = 1 + Math.floor(rng() * 6);
            const evasionReduction = evasionRoll * targetUnit.man;
            const appliedDamage = 1 + Math.max(0, damagePool - targetUnit.dp - evasionReduction);
            const hpBefore = targetUnit.hp;
            targetUnit.hp -= appliedDamage;
            const hpAfter = targetUnit.hp;
            $ev("attack-unit", {
                unit: JSON.parse(JSON.stringify(unit)),
                target: JSON.parse(JSON.stringify(targetUnit)),
                damageRoll,
                damagePool,
                evasionRoll,
                evasionReduction,
                appliedDamage,
                hpBefore,
                hpAfter
            }, unit.owner);

            // Kill target on spot
            if (targetUnit.hp <= 0) {
                $kill(targetUnit)
            }
        };
        const $kill = (unit: Unit) => {
            $ev("kill-unit", {
                unit: JSON.parse(JSON.stringify(unit))
            }, unit.owner === 1 ? 2 : 1);
            deadUnits.add(unit.id);

            // Play on-kill effects
            const effectsToActivate: Array<GameEffect & { _player: number, _unit?: number }> = [];
            for (let effect of playedEffects) {
                if (effect.trigger === "any-plane-killed") {
                    effectsToActivate.push(effect);
                } else if (effect.trigger === "any-plane-of-kind-killed"
                    && effect.targetKind === unit.kind) {
                    effectsToActivate.push(effect);
                } else if (effect.trigger === "any-own-plane-killed"
                    && effect._player === unit.owner) {
                    effectsToActivate.push(effect);
                } else if (effect.trigger === "any-own-plane-of-kind-killed"
                    && effect._player === unit.owner
                    && effect.targetKind === unit.kind) {
                    effectsToActivate.push(effect);
                } else if (effect.trigger === "any-enemy-plane-killed"
                    && effect._player !== unit.owner) {
                    effectsToActivate.push(effect);
                } else if (effect.trigger === "any-enemy-plane-of-kind-killed"
                    && effect._player !== unit.owner
                    && effect.targetKind === unit.kind) {
                    effectsToActivate.push(effect);
                }
            }

            for (let effect of effectsToActivate) {
                $activateEffect(effect, effect._player, effect._unit);
            }
        }
        const $unitKillPhase = (unit: Unit) => {
            if (deadUnits.has(unit.id)) {
                return;
            }

            if (unit.hp <= 0) {
                $kill(unit);
            }
        };

        const player1Units = () => units.filter(u => u.owner === 1);
        const player2Units = () => units.filter(u => u.owner === 2);

        // 1. Begin game
        $ev("begin-game", {});

        // 2. Players commit commands
        $ev("commit-commands", {
            commands: player1Commands
        }, 1);
        $ev("commit-commands", {
            commands: player2Commands
        }, 2);

        // 3. Add cards to playing deck
        for (let cmd of player1Commands) {
            $addToPlayingDeck(cmd, 1);
        }
        for (let cmd of player2Commands) {
            $addToPlayingDeck(cmd, 2);
        }

        // 4. Shuffle playing deck
        $shufflePlayingDeck();

        // 5. Turn loop
        while (winnerPlayer === -1) {

            startingUnitSize = units.length;

            // Begin turn
            $ev("begin-turn", {
                turn: turnNumber
            });

            // If there are cards in the playing deck, play the top card
            if (playingDeck.length > 0) {
                const { card, _player } = playingDeck.shift()!;
                $play(card, _player);
            }

            // Shuffle units
            shuffle(units, rng);
            $ev("shuffle-units", {});

            for (let unit of units) {
                $unitTargetPhase(unit);
                $unitAttackPhase(unit);
                $unitKillPhase(unit);
            }

            const playersWithUnits = new Set(units.filter(
                u => !deadUnits.has(u.id)
            ).map(u => u.owner));
            if (playingDeck.length === 0 && spawnedPlayers.size >= 2 && playersWithUnits.size === 1) {
                $win(playersWithUnits.values().next().value, "All enemy units are dead.");
            }

            // Increment turn number
            turnNumber++;

            const endingUnitSize = units.length;

            if (endingUnitSize === startingUnitSize) {
                consecutiveTieRounds++;
            } else {
                consecutiveTieRounds = 0;
            }

            if (consecutiveTieRounds >= 100) {
                $win(0, "The match has been tied for 100 consecutive rounds.");
            }

        }

        return {
            seed: matchSeed,
            winner: winnerPlayer,
            commands: [
                player1Commands,
                player2Commands
            ],
            events
        };

    }
}