import * as THREE from 'three';
import { Component, GameHost, GameSystem, Entity, COMPONENT_TYPES, SpawnEntityOpts } from "@doggo/ecs";

export interface AirplaneComponentData {
    forward: THREE.Vector3;
    up: THREE.Vector3;
    right: THREE.Vector3;
    rotation: THREE.Quaternion;
    position: THREE.Vector3;
    velocity: number;
    yawSpeed: number;
    pitchSpeed: number;
    rollSpeed: number;
    maxSpeed: number;
    throttleForce: number;
    controlYaw: number;
    controlPitch: number;
    controlRoll: number;
    keepWithin?: THREE.Box3;
}

export type AirplaneComponent = Component<AirplaneComponentData>;

type Airplane = [Entity, AirplaneComponent];

interface AirplaneControls {
    yaw: number;
    pitch: number;
    roll: number;
}

export class AirplaneMovementSystem implements GameSystem {

    private assortAirplanes(host: GameHost): Array<Airplane> {
        const airplaneEntities = host.entities.filter(e => e.components.has(COMPONENT_TYPES.AIRPLANE));
        const airplanes: Array<Airplane> = [];
        for (const airplaneEntity of airplaneEntities) {
            const airplaneComponent = airplaneEntity.components.get<AirplaneComponentData>(COMPONENT_TYPES.AIRPLANE);
            if (airplaneComponent) {
                airplanes.push([airplaneEntity, airplaneComponent]);
            }
        }
        return airplanes;
    }

    private clampControls(controls: AirplaneControls): AirplaneControls {
        return {
            yaw: Math.max(-1, Math.min(1, controls.yaw)),
            pitch: Math.max(-1, Math.min(1, controls.pitch)),
            roll: Math.max(-1, Math.min(1, controls.roll))
        };
    }

    private updateMovement(entity: Entity, plane: AirplaneComponentData, delta: number) {

        // const controls = this.clampControls(this._ai.think(this.state));
        const controls = this.clampControls({
            yaw: plane.controlYaw,
            pitch: plane.controlPitch,
            roll: plane.controlRoll
        });

        // Turning of aircraft
        const deltaYaw = new THREE.Quaternion().setFromAxisAngle(
            plane.up,
            controls.yaw * plane.yawSpeed * delta
        );
        const deltaPitch = new THREE.Quaternion().setFromAxisAngle(
            plane.right,
            controls.pitch * plane.pitchSpeed * delta
        );
        const deltaRoll = new THREE.Quaternion().setFromAxisAngle(
            plane.forward,
            controls.roll * plane.rollSpeed * delta
        );
        plane.rotation.multiply(deltaYaw);
        plane.rotation.multiply(deltaPitch);
        plane.rotation.multiply(deltaRoll);

        // Recalculate axes
        plane.forward.set(0, 0, 1).applyQuaternion(plane.rotation);
        plane.up.set(0, 1, 0).applyQuaternion(plane.rotation);
        plane.right.set(1, 0, 0).applyQuaternion(plane.rotation);

        // Acceleration
        let acceleration = plane.throttleForce;
        plane.velocity += acceleration * delta;

        if (plane.velocity > plane.maxSpeed) {
            plane.velocity = plane.maxSpeed;
        } else if (plane.velocity < -plane.maxSpeed) {
            plane.velocity = -plane.maxSpeed;
        }

        // Movement
        plane.position.add(plane.forward.clone().multiplyScalar(plane.velocity * delta));

        // Teleport to other side of arena
        if (plane.keepWithin) {
            if (plane.position.x < plane.keepWithin.min.x) {
                plane.position.x = plane.keepWithin.max.x;
            } else if (plane.position.x > plane.keepWithin.max.x) {
                plane.position.x = plane.keepWithin.min.x;
            }
            if (plane.position.y < plane.keepWithin.min.y) {
                plane.position.y = plane.keepWithin.max.y;
            } else if (plane.position.y > plane.keepWithin.max.y) {
                plane.position.y = plane.keepWithin.min.y;
            }
            if (plane.position.z < plane.keepWithin.min.z) {
                plane.position.z = plane.keepWithin.max.z;
            } else if (plane.position.z > plane.keepWithin.max.z) {
                plane.position.z = plane.keepWithin.min.z;
            }
        }

        // Apply to object
        entity.object?.position.set(plane.position.x, plane.position.y, plane.position.z);
        entity.object?.setRotationFromQuaternion(plane.rotation);

    }

    updateFixed(host: GameHost, delta: number): void {

        const airplanes = this.assortAirplanes(host);
        for (const [airplaneEntity, airplaneComponent] of airplanes) {
            const airplaneObject = airplaneEntity.object;
            if (airplaneObject) {
                this.updateMovement(airplaneEntity, airplaneComponent.data, delta);
            }
        }

    }

}

export function createAirplane(host: GameHost, additionalSpawnOpts?: SpawnEntityOpts): Entity {
    let spawnOpts: SpawnEntityOpts = {
        components: [
            {
                type: COMPONENT_TYPES.AIRPLANE,
                data: {
                    forward: new THREE.Vector3(0, 0, 1),
                    up: new THREE.Vector3(0, 1, 0),
                    right: new THREE.Vector3(1, 0, 0),
                    rotation: new THREE.Quaternion(),
                    position: new THREE.Vector3(0, 0, 0),
                    velocity: 0,
                    yawSpeed: 1,
                    pitchSpeed: 1,
                    rollSpeed: 1,
                    maxSpeed: 1,
                    throttleForce: 0.01,
                    controlYaw: 0,
                    controlPitch: 0,
                    controlRoll: 0
                }
            } as AirplaneComponent
        ]
    };
    if (additionalSpawnOpts) {
        spawnOpts = {
            ...spawnOpts,
            ...additionalSpawnOpts
        };
    }
    return host.spawn(spawnOpts);
}
