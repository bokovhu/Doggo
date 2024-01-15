import * as THREE from "three";
import { GameObject } from "./GameObject";

export interface IExplosionParticle extends GameObject {
    readonly velocity: THREE.Vector3;
    readonly color: THREE.ColorRepresentation;
}
