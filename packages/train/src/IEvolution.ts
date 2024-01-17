import { ISpecies } from "./ISpecies";

export interface IEvolution {
    readonly epoch: number;
    readonly generationTime: number;
    readonly species: Array<ISpecies>;

    update(dt: number): void;
}