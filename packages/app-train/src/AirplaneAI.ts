import { AirplaneControls } from "./AirplaneControls";
import { AirplaneState } from "./AirplaneState";
import * as brain from "brain.js";
import { AIRPLANE_AI_NN_HIDDEN_LAYER_SIZES, AIRPLANE_AI_SURROUNDINGS_TOP_K } from "./constants";
import { AirplaneSurroundingObject } from "./AirplaneSurroundingObject";
import { ISpecies } from "./ISpecies";

export type AirplaneAIFn = (state: AirplaneState) => AirplaneControls;
export interface AirplaneAI {
    kind: "test" | "nn";
    think: AirplaneAIFn;
}

export const TEST_AIRPLANE_AI: AirplaneAI = {
    kind: "test",
    think: (state: AirplaneState) => {
        return {
            pitch: 1.0,
            yaw: 0.01,
            roll: 0.03
        };
    }
};

function createDummySurroundingObjects(k: number): Array<AirplaneSurroundingObject> {
    const surroundingObjects: Array<AirplaneSurroundingObject> = [];
    for (let i = 0; i < k; i++) {
        surroundingObjects.push({
            active: 0,
            direction: [0, 0, 0],
            distance: 99,
            velocity: [0, 0, 0]
        });
    }
    return surroundingObjects;
}

const DUMMY_INPUT_STATE: AirplaneState = {
    position: [0, 0, 0],
    velocity: 0,
    up: [0, 0, 0],
    forward: [0, 0, 0],
    right: [0, 0, 0],
    surroundingObjects: createDummySurroundingObjects(AIRPLANE_AI_SURROUNDINGS_TOP_K)
};

function airplaneStateToNNInput(state: AirplaneState): Array<number> {
    return [
        ...state.position,
        state.velocity,
        ...state.up,
        ...state.forward,
        ...state.right,
        ...state.surroundingObjects.map((surroundingObject: AirplaneSurroundingObject) => {
            return [
                surroundingObject.active,
                ...surroundingObject.direction,
                surroundingObject.distance,
                ...surroundingObject.velocity
            ];
        }).reduce((a, b) => a.concat(b), [])
    ];
}

function nnOutputToAirplaneControls(output: Array<number>): AirplaneControls {
    return {
        pitch: output[0],
        yaw: output[1],
        roll: output[2]
    };
}

const DUMMY_INPUT: Array<number> = airplaneStateToNNInput(DUMMY_INPUT_STATE);

export class NNAirplaneAI implements AirplaneAI {

    private _species: ISpecies | null = null;
    private _neuralNetwork: brain.NeuralNetwork<any, any> = new brain.NeuralNetwork({
        binaryThresh: 0.5,
        hiddenLayers: AIRPLANE_AI_NN_HIDDEN_LAYER_SIZES,
        activation: 'sigmoid',
        inputSize: DUMMY_INPUT.length,
        outputSize: 3
    });

    constructor() {
        this._neuralNetwork.initialize();
    }

    get kind(): "test" | "nn" {
        return "nn";
    }

    get species(): ISpecies | null {
        return this._species;
    }

    load(
        species: ISpecies
    ) {
        this._neuralNetwork.weights = species.networkWeights;
        this._neuralNetwork.biases = species.networkBiases;
        this._species = species;
    }

    think(state: AirplaneState): AirplaneControls {

        // Turn the state into an array of numbers
        const nnInput: Array<number> = airplaneStateToNNInput(state);

        // Run the neural network
        const nnOutput: any = this._neuralNetwork.run(nnInput);

        // Interpret the output
        return nnOutputToAirplaneControls(nnOutput);

    }
}

export const NN_AIRPLANE_AI: AirplaneAI = new NNAirplaneAI();
