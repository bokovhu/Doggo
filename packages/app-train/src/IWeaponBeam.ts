import * as THREE from 'three';
import { GameObject } from "./GameObject";

export interface IWeaponBeam extends GameObject {
    readonly origin: THREE.Vector3;
    readonly direction: THREE.Vector3;
}