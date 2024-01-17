import * as THREE from 'three';
import { AirplaneParameters } from './AirplaneParameters';

export const AIRPLANE_DIMENSIONS: THREE.Vector3 = new THREE.Vector3(0.2, 0.1, 0.4);
export const AIRPLANE_SHOOTING_DELAY = 0.1;
export const AIRPLANE_PARAMS: AirplaneParameters = {
    maxSpeed: 10,
    throttleForce: 40,
    rollSpeed: 10,
    pitchSpeed: 1,
    yawSpeed: 1
};
export const AIRPLANE_AI_SURROUNDINGS_TOP_K = 10;
export const AIRPLANE_AI_NN_HIDDEN_LAYER_SIZES = [10, 10];
export const ASTEROID_RADIUS: number = 0.2;
export const ASTEROID_WIDTH_SEGMENTS = 8;
export const ASTEROID_HEIGHT_SEGMENTS = 8;
export const ASTEROID_VELOCITY_MAGNITUDE = 1;
export const WEAPON_BEAM_LENGTH = 100;
export const WEAPON_BEAM_THICKNESS = 0.025;
export const WEAPON_BEAM_RADIAL_SEGMENTS = 4;
export const WEAPON_BEAM_MAX_LIFETIME = 0.05;
export const EXPLOSION_PARTICLE_RADIUS = 0.05;
export const EXPLOSION_PARTICLE_WIDTH_SEGMENTS = 4;
export const EXPLOSION_PARTICLE_HEIGHT_SEGMENTS = 4;
export const EXPLOSION_PARTICLE_COLORS = [
    0xff0000,
    0xffff00,
    0xffffff
];
export const EXPLOSION_PARTICLE_VELOCITY_MAGNITUDE = 10;
export const EXPLOSION_PARTICLE_MAX_LIFETIME = 0.5;
export const EXPLOSION_PARTICLE_COUNT = 100;
export const SCENE_BACKGROUND_COLOR = 0x000000;
export const CAMERA_FOV = 80;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 1000;
export const CAMERA_ARENA_DISTANCE = 2;
export const TIME_SCALE = 10;
export const EVOLUTION_POPULATION_SIZE = 100;
export const EVOLUTION_SURVIVORS_PER_GENERATION = 10;
export const EVOLUTION_MUTANTS_PER_SURVIVOR = 10;
export const EVOLUTION_NEW_RANDOMS_PER_GENERATION = 10;
export const EVOLUTION_MUTATION_RATE = 0.1;
export const EVOLUTION_MAX_GENERATION_TIME = 10;
export const EVOLUTION_REWARDS = {
    asteroid: 1,
};
