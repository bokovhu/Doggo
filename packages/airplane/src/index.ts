import * as THREE from 'three';
import { Component } from "@doggo/ecs";

export interface AirplaneComponentData {
    forward: THREE.Vector3;
    up: THREE.Vector3;
    right: THREE.Vector3;
    rotation: THREE.Quaternion;
    velocity: number;
}

export type AirplaneComponent = Component<AirplaneComponentData>;