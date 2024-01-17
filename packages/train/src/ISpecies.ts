
export interface ISpecies {
    id: number;
    generation: number;
    parent: number | null;
    score: number;
    networkWeights: Array<Array<Float32Array>>;
    networkBiases: Array<Float32Array>;

    loadWeights(weights: Array<Array<Float32Array>>): void;
    loadBiases(biases: Array<Float32Array>): void;
    setScore(score: number): void;
}

var SPECIES_ID_SEQUENCE = 0;

export function nextSpeciesId(): number {
    return SPECIES_ID_SEQUENCE++;
}
