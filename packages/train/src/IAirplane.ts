import * as THREE from 'three';
import { GameObject } from "./GameObject";
import { AirplaneAI } from './AirplaneAI';
import { AirplaneState } from './AirplaneState';

export interface IAirplane extends GameObject {
    readonly velocity: number;
    readonly up: THREE.Vector3;
    readonly forward: THREE.Vector3;
    readonly right: THREE.Vector3;
    readonly rotation: THREE.Quaternion;
    readonly ai: AirplaneAI;
    readonly state: AirplaneState;
}