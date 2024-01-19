import * as THREE from 'three';

export interface GameObject {
    readonly id: number;
    readonly position: THREE.Vector3;
    readonly object: THREE.Object3D;
    readonly isAlive: boolean;
    readonly kind: string;
    kill(): void;
    update(dt: number): void;
}

var GAME_OBJECT_ID_SEQUENCE = 0;

export function nextGameObjectId(): number {
    return GAME_OBJECT_ID_SEQUENCE++;
}
