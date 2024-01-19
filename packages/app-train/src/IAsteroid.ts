import * as THREE from 'three';
import { GameObject } from "./GameObject";

export interface IAsteroid extends GameObject {
    readonly velocity: THREE.Vector3;
}
