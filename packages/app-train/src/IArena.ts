import * as THREE from 'three';
import { GameObject } from './GameObject';
import { IAirplane } from './IAirplane';
import { IAsteroid } from './IAsteroid';
import { IWeaponBeam } from './IWeaponBeam';
import { IExplosionParticle } from './IExplosionParticle';

export interface IArena {
    readonly arenaSize: THREE.Vector3;
    readonly arenaCenter: THREE.Vector3;
    readonly arenaObjects: Array<GameObject>;

    readonly airplanes: Array<IAirplane>;
    readonly asteroids: Array<IAsteroid>;
    readonly weaponBeams: Array<IWeaponBeam>;
    readonly explosionParticles: Array<IExplosionParticle>;

    teleportWithinArena(position: THREE.Vector3): THREE.Vector3;
    spawn(object: GameObject): void;
    find(id: number): GameObject | undefined;
    kill(id: number): void;
}
