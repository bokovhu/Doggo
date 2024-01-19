import * as THREE from 'three';
import { WEAPON_BEAM_LENGTH, WEAPON_BEAM_MAX_LIFETIME, WEAPON_BEAM_RADIAL_SEGMENTS, WEAPON_BEAM_THICKNESS } from './constants';
import { GameObject, nextGameObjectId } from './GameObject';
import { IWeaponBeam } from './IWeaponBeam';

export class WeaponBeam implements IWeaponBeam {

    private _id: number = nextGameObjectId();
    private _origin: THREE.Vector3 = new THREE.Vector3();
    private _direction: THREE.Vector3 = new THREE.Vector3();
    private _object: THREE.Object3D = new THREE.Object3D();
    private _lifetime: number = 0;
    private _isAlive: boolean = true;

    constructor() {
        const geometry = new THREE.CylinderGeometry(
            WEAPON_BEAM_THICKNESS,
            WEAPON_BEAM_THICKNESS,
            WEAPON_BEAM_LENGTH,
            WEAPON_BEAM_RADIAL_SEGMENTS
        );
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.rotateX(Math.PI / 2);
        cylinder.position.set(0, 0, WEAPON_BEAM_LENGTH / 2);
        this._object.add(cylinder);
        this._object.visible = false;
    }

    public update(delta: number) {

        this._lifetime += delta;

        if (this._lifetime > WEAPON_BEAM_MAX_LIFETIME) {
            this._isAlive = false;
        }

        this._object.lookAt(
            this._origin.clone().add(this._direction)
        );

        // Position the object
        this._object.position.set(
            this._origin.x,
            this._origin.y,
            this._origin.z
        );

        // Show the object
        this._object.visible = true;
    }

    get origin(): THREE.Vector3 {
        return this._origin;
    }

    get position(): THREE.Vector3 {
        return this._origin;
    }

    get direction(): THREE.Vector3 {
        return this._direction;
    }

    get object(): THREE.Object3D {
        return this._object;
    }

    get isAlive(): boolean {
        return this._isAlive;
    }

    get kind(): string {
        return 'weapon-beam';
    }

    get id(): number {
        return this._id;
    }

    kill(): void {
        this._isAlive = false;
    }

}
