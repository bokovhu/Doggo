import { ISpecies, nextSpeciesId } from "./ISpecies";

export class Species implements ISpecies {

    private _id: number = nextSpeciesId();
    private _score: number = 0;
    private _networkWeights: Array<Array<Float32Array>> = [];
    private _networkBiases: Array<Float32Array> = [];

    constructor(
        private _generation: number,
        private _parentSpecies?: Species
    ) {

    }

    get id(): number {
        return this._id;
    }

    get generation(): number {
        return this._generation;
    }

    get parent(): number | null {
        return this._parentSpecies ? this._parentSpecies.id : null;
    }

    get networkWeights(): Array<Array<Float32Array>> {
        return this._networkWeights;
    }

    get networkBiases(): Array<Float32Array> {
        return this._networkBiases;
    }

    get score(): number {
        return this._score;
    }

    public loadWeights(weights: Array<Array<Float32Array>>): void {
        this._networkWeights = weights;
    }

    public loadBiases(biases: Array<Float32Array>): void {
        this._networkBiases = biases;
    }

    public setScore(score: number): void {
        this._score = score;
    }

}
