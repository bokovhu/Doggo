import { GameRandoms, GameRng } from "@doggo/game-random";
import { GameCard, GameCardEffectDetails, GameCardSpawnDetails, GameEffect, GameEvent, GameEventKind, GameMatch, Unit } from "./model";
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
        playerOneCardIds: Array<number>,
        playerTwoCardIds: Array<number>,
        matchSeed: number
    ): GameMatch {

        const rng = GameRandoms.cardGameSimulation(matchSeed);
        const cardGenerator = new GameCardGenerator();

        let planeIdSequence = 0;
        let eventIdSequence = 0;
        let events: Array<GameEvent> = [];
        let winnerPlayer: number = -1;
        let turnNumber = 1;
        let playingDeck: Array<GameCard & { _player: number }> = [];
        let playerOneUnits: Array<Unit> = [];
        let playerTwoUnits: Array<Unit> = [];
        let playerOneActivatedEffects: Array<GameEffect> = [];
        let playerTwoActivatedEffects: Array<GameEffect> = [];

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
        const $addToPlayingDeck = (card: GameCard, player: number) => {
            playingDeck.push({
                ...card,
                _player: player
            });
            $ev("add-to-playing-deck", {
                card
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
        const $play = (card: GameCard, player: number) => {
            $ev("play-card", {
                card
            }, player);

            if (card.kind === "spawn") {
                const spawnDetails = card.spawnDetails!;
                for (let i = 0; i < spawnDetails.amount; i++) {
                    const unit: Unit = {
                        id: planeIdSequence++,
                        hp: spawnDetails.attributes.health,
                        ap: spawnDetails.attributes.attack,
                        dp: spawnDetails.attributes.manouverability,
                        man: spawnDetails.attributes.manouverability,
                        kind: spawnDetails.kind,
                        position: ["A", 1],
                        owner: player,
                        target: -1
                    };
                    $ev("spawn-unit", {
                        unit
                    }, player);
                    if (player === 1) {
                        playerOneUnits.push(unit);
                    } else {
                        playerTwoUnits.push(unit);
                    }
                }
            } else if (card.kind === "effect") {
                const effectDetails = card.effectDetails!;
                for (const effect of effectDetails.effects) {
                    $ev("activate-effect", {
                        effect
                    }, player);
                    if (player === 1) {
                        playerOneActivatedEffects.push(effect);
                    } else {
                        playerTwoActivatedEffects.push(effect);
                    }
                }
            }
        };

        const player1Cards = playerOneCardIds.map(id => cardGenerator.generateCard(id));
        const player2Cards = playerTwoCardIds.map(id => cardGenerator.generateCard(id));

        // 1. Begin game
        $ev("begin-game", {});

        // 2. Players commit commands
        $ev("commit-commands", {
            cards: player1Cards
        }, 1);
        $ev("commit-commands", {
            cards: player2Cards
        }, 2);

        // 3. Add cards to playing deck
        for (let card of player1Cards) {
            $addToPlayingDeck(card, 1);
        }
        for (let card of player2Cards) {
            $addToPlayingDeck(card, 2);
        }

        // 4. Shuffle playing deck
        $shufflePlayingDeck();

        // 5. Turn loop
        while (winnerPlayer === -1) {

            // Begin turn
            $ev("begin-turn", {
                turn: turnNumber
            });

            // If there are cards in the playing deck, play the top card
            if (playingDeck.length > 0) {
                const card = playingDeck.shift()!;
                $play(card, card._player);
            }

            if (playingDeck.length === 0) {
                // DEV win criteria: Player with the most units wins
                $win(playerOneUnits.length > playerTwoUnits.length ? 1 : 2, "No cards left in playing deck, and player 1 has more units than player 2 (" + playerOneUnits.length + " vs " + playerTwoUnits.length + ")");
            }

            // Increment turn number
            turnNumber++;

        }

        return {
            seed: matchSeed,
            winner: winnerPlayer,
            events
        };

    }
}