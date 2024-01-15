import * as THREE from 'three';
import { nextGameObjectId } from "./GameObject";
import { IExplosionParticle } from "./IExplosionParticle";
import { EXPLOSION_PARTICLE_COLORS, EXPLOSION_PARTICLE_HEIGHT_SEGMENTS, EXPLOSION_PARTICLE_MAX_LIFETIME, EXPLOSION_PARTICLE_RADIUS, EXPLOSION_PARTICLE_WIDTH_SEGMENTS } from './constants';
import { IArena } from './IArena';

export class ExplosionParticle implements IExplosionParticle {

    private _id: number = nextGameObjectId();
    private _position: THREE.Vector3 = new THREE.Vector3();
    private _velocity: THREE.Vector3 = new THREE.Vector3();
    private _object: THREE.Object3D = new THREE.Object3D();
    private _color: THREE.ColorRepresentation = 0xffffff;
    private _isAlive: boolean = true;
    private _lifetime: number = 0;

    constructor(
        private _arena: IArena
    ) {
        const geometry = new THREE.SphereGeometry(
            EXPLOSION_PARTICLE_RADIUS,
            EXPLOSION_PARTICLE_WIDTH_SEGMENTS,
            EXPLOSION_PARTICLE_HEIGHT_SEGMENTS
        );
        // Random color for the particle
        this._color = EXPLOSION_PARTICLE_COLORS[Math.floor(Math.random() * EXPLOSION_PARTICLE_COLORS.length)];
        const material = new THREE.MeshBasicMaterial({ color: this._color });
        const sphere = new THREE.Mesh(geometry, material);
        this._object.add(sphere);
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
        return 'explosion-particle';
    }

    get color(): THREE.ColorRepresentation {
        return this._color;
    }

    get id(): number {
        return this._id;
    }

    update(dt: number): void {

        this._lifetime += dt;

        if (this._lifetime > EXPLOSION_PARTICLE_MAX_LIFETIME) {
            this._isAlive = false;
        }

        // Scale proportional to lifetime
        const scale = 1 - (this._lifetime / EXPLOSION_PARTICLE_MAX_LIFETIME);
        this._object.scale.set(scale, scale, scale);

        // Move
        this._position.add(this._velocity.clone().multiplyScalar(dt));

        // Apply to object
        this._object.position.set(this._position.x, this._position.y, this._position.z);

    }

    kill(): void {
        this._isAlive = false;
    }

}