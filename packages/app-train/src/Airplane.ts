import * as THREE from 'three';
import { WeaponBeam } from './WeaponBeam';
import { IArena } from './IArena';
import { AirplaneAI } from './AirplaneAI';
import { AirplaneParameters } from './AirplaneParameters';
import { AIRPLANE_AI_SURROUNDINGS_TOP_K, AIRPLANE_DIMENSIONS, AIRPLANE_SHOOTING_DELAY } from './constants';
import { AirplaneState } from './AirplaneState';
import { nextGameObjectId } from './GameObject';
import { IAirplane } from './IAirplane';
import { AirplaneControls } from './AirplaneControls';
import { AirplaneSurroundingObject } from './AirplaneSurroundingObject';

export class Airplane implements IAirplane {

    private _id: number = nextGameObjectId();
    private _position: THREE.Vector3 = new THREE.Vector3();
    private _velocity: number = 0;
    private _up: THREE.Vector3 = new THREE.Vector3(0, 1, 0);
    private _forward: THREE.Vector3 = new THREE.Vector3(0, 0, 1);
    private _right: THREE.Vector3 = new THREE.Vector3(1, 0, 0);
    private _rotation: THREE.Quaternion = new THREE.Quaternion();
    private _object: THREE.Object3D = new THREE.Object3D();
    private _shootingCooldown: number = 0;
    private _isAlive: boolean = true;
    private _pendingScore: number = 0;

    constructor(
        private _arena: IArena,
        private _ai: AirplaneAI,
        private _parameters: AirplaneParameters
    ) {
        const geometry = new THREE.BoxGeometry(
            AIRPLANE_DIMENSIONS.x,
            AIRPLANE_DIMENSIONS.y,
            AIRPLANE_DIMENSIONS.z
        );
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this._object.add(cube);
    }

    get position(): THREE.Vector3 {
        return this._position;
    }

    get velocity(): number {
        return this._velocity;
    }

    get up(): THREE.Vector3 {
        return this._up;
    }

    get forward(): THREE.Vector3 {
        return this._forward;
    }

    get right(): THREE.Vector3 {
        return this._right;
    }

    get rotation(): THREE.Quaternion {
        return this._rotation;
    }

    get ai(): AirplaneAI {
        return this._ai;
    }

    get pendingScore(): number {
        return this._pendingScore;
    }

    get state(): AirplaneState {
        // Compute surrounding objects
        const allSurroundingObjects: Array<AirplaneSurroundingObject> = [];
        for (let asteroid of this._arena.asteroids) {
            const direction = asteroid.position.clone().sub(this._position).normalize();
            const distance = direction.length();
            const velocity = asteroid.velocity.clone().normalize();
            allSurroundingObjects.push({
                active: 1,
                direction: [direction.x, direction.y, direction.z],
                distance,
                velocity: [velocity.x, velocity.y, velocity.z]
            });
        }

        allSurroundingObjects.sort((a, b) => a.distance - b.distance);

        // Find 10 nearest objects
        const nearestSurroundingObjects: Array<AirplaneSurroundingObject> = [];
        for (let surroundingObject of allSurroundingObjects) {
            if (nearestSurroundingObjects.length < AIRPLANE_AI_SURROUNDINGS_TOP_K) {
                nearestSurroundingObjects.push(surroundingObject);
            } else {
                break;
            }
        }
        if (nearestSurroundingObjects.length < AIRPLANE_AI_SURROUNDINGS_TOP_K) {
            // Add inactive objects to fill up the array
            for (let i = nearestSurroundingObjects.length; i < AIRPLANE_AI_SURROUNDINGS_TOP_K; i++) {
                nearestSurroundingObjects.push({
                    active: 0,
                    direction: [0, 0, 0],
                    distance: 99,
                    velocity: [0, 0, 0]
                });
            }
        }

        return {
            position: [this._position.x, this._position.y, this._position.z],
            velocity: this._velocity,
            up: [this._up.x, this._up.y, this._up.z],
            forward: [this._forward.x, this._forward.y, this._forward.z],
            right: [this._right.x, this._right.y, this._right.z],
            surroundingObjects: nearestSurroundingObjects
        };
    }

    get object(): THREE.Object3D {
        return this._object;
    }

    get isAlive(): boolean {
        return this._isAlive;
    }

    get id(): number {
        return this._id;
    }

    public kill() {
        this._isAlive = false;
    }

    private clampControls(controls: AirplaneControls): AirplaneControls {
        return {
            yaw: Math.max(-1, Math.min(1, controls.yaw)),
            pitch: Math.max(-1, Math.min(1, controls.pitch)),
            roll: Math.max(-1, Math.min(1, controls.roll))
        };
    }

    private updateMovement(delta: number) {

        const controls = this.clampControls(this._ai.think(this.state));

        // Turning of aircraft
        const deltaYaw = new THREE.Quaternion().setFromAxisAngle(
            this._up,
            controls.yaw * this._parameters.yawSpeed * delta
        );
        const deltaPitch = new THREE.Quaternion().setFromAxisAngle(
            this._right,
            controls.pitch * this._parameters.pitchSpeed * delta
        );
        const deltaRoll = new THREE.Quaternion().setFromAxisAngle(
            this._forward,
            controls.roll * this._parameters.rollSpeed * delta
        );
        this._rotation.multiply(deltaYaw);
        this._rotation.multiply(deltaPitch);
        this._rotation.multiply(deltaRoll);

        // Recalculate axes
        this._forward.set(0, 0, 1).applyQuaternion(this._rotation);
        this._up.set(0, 1, 0).applyQuaternion(this._rotation);
        this._right.set(1, 0, 0).applyQuaternion(this._rotation);

        // Acceleration
        let acceleration = this._parameters.throttleForce;
        this._velocity += acceleration * delta;

        if (this._velocity > this._parameters.maxSpeed) {
            this._velocity = this._parameters.maxSpeed;
        } else if (this._velocity < -this._parameters.maxSpeed) {
            this._velocity = -this._parameters.maxSpeed;
        }

        // Movement
        this._position.add(this._forward.clone().multiplyScalar(this._velocity * delta));

        // Arena bounds (teleport)
        this._position.copy(
            this._arena.teleportWithinArena(this._position)
        );

        // Apply to object
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.setRotationFromQuaternion(this._rotation);

    }

    private updateShooting(delta: number) {

        this._shootingCooldown -= delta;

        if (this._shootingCooldown <= 0) {
            const weaponBeam = new WeaponBeam();

            weaponBeam.direction.copy(this._forward);
            weaponBeam.origin.copy(this._position);
            weaponBeam.object.position.copy(this._position);

            this._arena.spawn(weaponBeam);

            this._shootingCooldown = AIRPLANE_SHOOTING_DELAY;
        }

    }

    public update(delta: number) {
        this.updateMovement(delta);
        this.updateShooting(delta);
    }

    public addPendingScore(score: number): void {
        this._pendingScore += score;
    }

    public clearPendingScore(): void {
        this._pendingScore = 0;
    }

    get kind(): string {
        return 'airplane';
    }
}
