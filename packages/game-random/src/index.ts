export type GameRng = () => number;
export type GameRngFactory = (seed: number) => GameRng;

// Adapted from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
const splitmix32: GameRngFactory = (seed?: number) => {
    let a = typeof seed === "number" ? seed : 0;
    return function () {
        a |= 0; a = a + 0x9e3779b9 | 0;
        var t = a ^ a >>> 16; t = Math.imul(t, 0x21f0aaad);
        t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
    }
}

export const CARD_GENERATOR_SEED = 0x09D16440;
export const CARD_GAME_SIMULATION_SEED = 0x18E5DEFD;

var GlobalGameRandoms = {
    cardGenerator: (cardSeed: number) => splitmix32(CARD_GENERATOR_SEED ^ cardSeed),
    cardGameSimulation: (matchSeed: number) => splitmix32(CARD_GAME_SIMULATION_SEED ^ matchSeed),
};

export const GameRandoms = GlobalGameRandoms;
