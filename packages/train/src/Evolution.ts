import { NNAirplaneAI } from "./AirplaneAI";
import { IArena } from "./IArena";
import { IEvolution } from "./IEvolution";
import { ISpecies } from "./ISpecies";
import { Species } from "./Species";
import { EVOLUTION_MAX_GENERATION_TIME } from "./constants";

export class Evolution implements IEvolution {

    private _epoch: number = 0;
    private _generationTime: number = 0;
    private _species: Array<ISpecies> = [];

    constructor(
        private _arena: IArena
    ) {

    }

    get epoch(): number {
        return this._epoch;
    }

    get generationTime(): number {
        return this._generationTime;
    }

    get species(): Array<ISpecies> {
        return this._species;
    }

    private endGeneration() {
        console.log("[Evolution]", "Ending generation", this._epoch, this._species);
        this._generationTime = 0;
        this._epoch++;
    }

    private updateFitness() {

        for (let airplane of this._arena.airplanes) {

            const ai = airplane.ai;

            if (ai.kind !== "nn") {
                // Skip non-neural-network AIs
                continue;
            }

            const nnAi = ai as NNAirplaneAI;
            const species = nnAi.species;

            species?.setScore(
                species.score + airplane.pendingScore
            );

        }

    }

    private createSpeciesFromNN(
        weights: Array<Array<Float32Array>>,
        biases: Array<Float32Array>
    ) {
        const newSpecies = new Species(
            this._epoch,
            undefined
        );
        newSpecies.loadWeights(weights);
        newSpecies.loadBiases(biases);

        this._species.push(newSpecies);

        return newSpecies;
    }

    public update(dt: number) {

        this._generationTime += dt;

        if (this._generationTime >= EVOLUTION_MAX_GENERATION_TIME) {
            this.endGeneration();
        } else {
            this.updateFitness();
        }

    }

}