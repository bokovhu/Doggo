import * as THREE from 'three';
import { IArena } from './IArena';
import { ASTEROID_HEIGHT_SEGMENTS, ASTEROID_RADIUS, ASTEROID_WIDTH_SEGMENTS } from './constants';
import { GameObject, nextGameObjectId } from './GameObject';
import { IAsteroid } from './IAsteroid';

export class Asteroid implements IAsteroid {

    private _id: number = nextGameObjectId();
    private _position: THREE.Vector3 = new THREE.Vector3();
    private _velocity: THREE.Vector3 = new THREE.Vector3();
    private _object: THREE.Object3D = new THREE.Object3D();
    private _isAlive: boolean = true;

    constructor(
        private _arena: IArena
    ) {
        const geometry = new THREE.SphereGeometry(ASTEROID_RADIUS, ASTEROID_WIDTH_SEGMENTS, ASTEROID_HEIGHT_SEGMENTS);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(geometry, material);
        this._object.add(sphere);
    }

    public update(delta: number) {

        // Move asteroid along the velocity vector
        this._position.add(this._velocity.clone().multiplyScalar(delta));

        // Arena bounds (teleport)
        this._position.copy(
            this._arena.teleportWithinArena(this._position)
        );

        // Apply to object
        this._object.position.set(this._position.x, this._position.y, this._position.z);

    }

    public kill() {
        this._isAlive = false;
    }

    get position(): THREE.Vector3 {
        return this._position;
    }

    get velocity(): THREE.Vector3 {
        return this._velocity;
    }

    get object(): THREE.Object3D {
        return this._object;
    }

    get isAlive(): boolean {
        return this._isAlive;
    }

    get kind(): string {
        return 'asteroid';
    }

    get id(): number {
        return this._id;
    }

}
