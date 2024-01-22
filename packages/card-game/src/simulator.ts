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
        let playerOneActivatedEffects: Array<GameEffect> = [];
        let playerTwoActivatedEffects: Array<GameEffect> = [];
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
        const $play = (card: GameCard, player: number, column?: "A" | "B" | "C" | "D" | "E" | "F") => {
            $ev("play-card", {
                card
            }, player);

            if (card.kind === "spawn") {
                const spawnDetails = card.spawnDetails!;
                const spawnedUnits: Array<Unit> = [];
                for (let i = 0; i < spawnDetails.amount; i++) {
                    const unit: Unit = {
                        id: planeIdSequence++,
                        hp: spawnDetails.attributes.hp,
                        ap: spawnDetails.attributes.ap,
                        dp: spawnDetails.attributes.dp,
                        man: spawnDetails.attributes.man,
                        kind: spawnDetails.kind,
                        position: [
                            column!,
                            player === 1 ? 1 : 4
                        ],
                        owner: player,
                        target: -1
                    };
                    $ev("spawn-unit", {
                        unit: JSON.parse(JSON.stringify(unit))
                    }, player);
                    units.push(unit);
                    spawnedUnits.push(unit);
                    spawnedPlayers.add(player);
                }
                $ev("spawn-n-units", {
                    units: JSON.parse(JSON.stringify(spawnedUnits))
                }, player);
            } else if (card.kind === "effect") {
                const effectDetails = card.effectDetails!;
                for (const effect of effectDetails.effects) {
                    $ev("activate-effect", {
                        effect: JSON.parse(JSON.stringify(effect))
                    }, player);
                    if (player === 1) {
                        playerOneActivatedEffects.push(effect);
                    } else {
                        playerTwoActivatedEffects.push(effect);
                    }
                }
            }
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
                const { card, column, _player } = playingDeck.shift()!;
                $play(card, _player, column);
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