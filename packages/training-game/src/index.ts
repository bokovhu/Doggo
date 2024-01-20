import { BaseGame } from "@doggo/base-game";
import { AirplaneComponentData, AirplaneMovementSystem, createAirplane } from "@doggo/airplane";
import { COMPONENT_TYPES, Entity } from "@doggo/ecs";
import { EVENT_TYPES, GameEvent } from "@doggo/events";

export class TrainingGame extends BaseGame {
    constructor() {
        super();

        this._systems.push(
            new AirplaneMovementSystem()
        );
    }

    protected onInit(): void {
        super.onInit();
        console.log("TrainingGame.onInit");

        this.eventBus.subscribe(
            EVENT_TYPES.ENTITY_SPAWNED,
            (event: GameEvent<Entity>) => {
                console.log("TrainingGame.onInit: entity spawned", event.data);
            }
        );

        this.eventBus.subscribe(
            EVENT_TYPES.ENTITY_KILLED,
            (event: GameEvent<unknown>) => {
                console.log("TrainingGame.onInit: entity killed", event.data);
            }
        );


        createAirplane(this.host);
    }
}