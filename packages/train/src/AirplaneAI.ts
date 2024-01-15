import { AirplaneControls } from "./AirplaneControls";
import { AirplaneState } from "./AirplaneState";

export type AirplaneAI = (state: AirplaneState) => AirplaneControls;

export const TEST_AIRPLANE_AI: AirplaneAI = (state: AirplaneState) => {
    return {
        pitch: 1.0,
        yaw: 0.01,
        roll: 0.03
    };
}
