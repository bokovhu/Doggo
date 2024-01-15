import * as THREE from 'three';
import { IArena } from "./IArena";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Airplane } from './Airplane';
import { Asteroid } from './Asteroid';
import { TEST_AIRPLANE_AI } from './AirplaneAI';
import { AIRPLANE_PARAMS, ASTEROID_VELOCITY_MAGNITUDE, CAMERA_ARENA_DISTANCE, CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, EXPLOSION_PARTICLE_COUNT, EXPLOSION_PARTICLE_VELOCITY_MAGNITUDE, SCENE_BACKGROUND_COLOR } from './constants';
import { GameObject } from './GameObject';
import { IAirplane } from './IAirplane';
import { IAsteroid } from './IAsteroid';
import { IWeaponBeam } from './IWeaponBeam';
import { IExplosionParticle } from './IExplosionParticle';
import { ExplosionParticle } from './ExplosionParticle';

export class TrainGame implements IArena {

    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _orbitControls: OrbitControls;
    private _lastFrame: number = new Date().getTime();
    private _gameRunning: boolean = true;
    private _arenaSize: THREE.Vector3 = new THREE.Vector3(10, 10, 10);
    private _arenaCenter: THREE.Vector3 = new THREE.Vector3(
        this._arenaSize.x / 2,
        this._arenaSize.y / 2,
        this._arenaSize.z / 2
    );
    private _updateAccumulator: number = 0;
    private _airplaneTimestep: number = 1.0 / 60.0;
    private _arenaObjects: Array<GameObject> = [];
    private _airplanes: Array<IAirplane> = [];
    private _asteroids: Array<IAsteroid> = [];
    private _weaponBeams: Array<IWeaponBeam> = [];
    private _explosionParticles: Array<IExplosionParticle> = [];

    constructor() {
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(SCENE_BACKGROUND_COLOR);

        const fov = CAMERA_FOV;
        const aspect = window.innerWidth / window.innerHeight;
        const near = CAMERA_NEAR;
        const far = CAMERA_FAR;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(
            this._arenaSize.x + CAMERA_ARENA_DISTANCE,
            this._arenaSize.y + CAMERA_ARENA_DISTANCE,
            this._arenaSize.z + CAMERA_ARENA_DISTANCE
        );
        this._camera.lookAt(this._arenaCenter);

        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        console.log(`[MatchGame]`, `Renderer created`, this._renderer);

        this._orbitControls = new OrbitControls(this._camera, this._renderer.domElement);
        this._orbitControls.update();

        window.addEventListener('resize', this.onWindowResize, false);
    }

    get arenaSize() {
        return this._arenaSize;
    }

    get arenaCenter() {
        return this._arenaCenter;
    }

    get arenaObjects() {
        return this._arenaObjects;
    }

    get airplanes() {
        return this._airplanes;
    }

    get asteroids() {
        return this._asteroids;
    }

    get weaponBeams() {
        return this._weaponBeams;
    }

    get explosionParticles() {
        return this._explosionParticles;
    }

    private onAnimationFrame() {
        const now = new Date().getTime();
        const delta = (now - this._lastFrame) / 1000.0;
        this._lastFrame = now;

        this.assortObjects();
        this.updateGameLogic(delta);

        if (this._gameRunning) {
            requestAnimationFrame(this.onAnimationFrame.bind(this));
        } else {
            console.log(`[MatchGame]`, `Game stopped, not requesting next frame`);
        }
    }

    private onWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private assortObjects() {
        this._airplanes = [];
        this._asteroids = [];
        this._weaponBeams = [];

        for (let object of this._arenaObjects) {
            switch (object.kind) {
                case 'airplane':
                    this._airplanes.push(object as IAirplane);
                    break;
                case 'asteroid':
                    this._asteroids.push(object as IAsteroid);
                    break;
                case 'weapon-beam':
                    this._weaponBeams.push(object as IWeaponBeam);
                    break;
            }
        }
    }

    private spawnExplosion(position: THREE.Vector3) {
        for (let i = 0; i < EXPLOSION_PARTICLE_COUNT; i++) {
            const newParticle = new ExplosionParticle(this);
            newParticle.position.copy(position);
            newParticle.velocity.set(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ).normalize().multiplyScalar(EXPLOSION_PARTICLE_VELOCITY_MAGNITUDE);
            this.spawn(newParticle);
        }
    }

    private hitAsteroidsWithWeapons() {
        const raycaster = new THREE.Raycaster();
        const asteroidObjects: Array<THREE.Object3D> = this._asteroids.map(asteroid => asteroid.object);

        for (let weaponBeam of this._weaponBeams) {
            raycaster.set(
                weaponBeam.origin,
                weaponBeam.direction
            );
            const intersections = raycaster.intersectObjects(asteroidObjects);

            if (intersections.length > 0) {
                const asteroid = this._asteroids.find(
                    asteroid => asteroid.object.uuid === intersections[0].object.uuid
                        || asteroid.object.uuid === intersections[0].object.parent?.uuid
                );
                if (asteroid) {
                    asteroid.kill();
                    this.spawnExplosion(asteroid.position);
                    console.log(`[TrainGame]`, `Asteroid killed`, asteroid.id);
                }
            }
        }
    }

    private removeDeadObjects() {
        const deadObjects = this._arenaObjects.filter(object => !object.isAlive);
        this._arenaObjects = this._arenaObjects.filter(object => object.isAlive);
        deadObjects.forEach(object => {
            this._scene.remove(object.object);
            console.log(`[TrainGame]`, `Removed dead object`, object.id);
        });
    }

    private updateGameLogic(delta: number) {
        this._orbitControls.update();

        this._updateAccumulator += delta;

        while (this._updateAccumulator >= this._airplaneTimestep) {

            // Update game objects
            this._arenaObjects.forEach(object => object.update(this._airplaneTimestep));

            // Hit asteroids with weapons
            this.hitAsteroidsWithWeapons();

            // Remove game objects that are no longer alive
            this.removeDeadObjects();

            this._updateAccumulator -= this._airplaneTimestep;
        }
        this._renderer.render(this._scene, this._camera);
    }

    private createArenaBorders() {

        const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(
            this._arenaSize.x,
            this._arenaSize.y,
            this._arenaSize.z
        ));
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const borders = new THREE.LineSegments(edges, material);
        this._scene.add(borders);

    }

    private createAirplanes() {
        const numPlanes = 1;

        for (let i = 0; i < numPlanes; i++) {
            const airplane = new Airplane(
                this,
                TEST_AIRPLANE_AI,
                AIRPLANE_PARAMS
            );

            airplane.position.set(
                Math.random() * this.arenaSize.x - this.arenaSize.x / 2,
                Math.random() * this.arenaSize.y - this.arenaSize.y / 2,
                Math.random() * this.arenaSize.z - this.arenaSize.z / 2
            );
            airplane.rotation.setFromAxisAngle(
                new THREE.Vector3(
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1
                ).normalize(),
                Math.random() * Math.PI * 2
            );

            this.spawn(airplane);
        }
    }

    private createAsteroids() {
        const numAsteroids = 100;

        for (let i = 0; i < numAsteroids; i++) {
            const asteroid = new Asteroid(this);

            asteroid.position.set(
                Math.random() * this.arenaSize.x - this.arenaSize.x / 2,
                Math.random() * this.arenaSize.y - this.arenaSize.y / 2,
                Math.random() * this.arenaSize.z - this.arenaSize.z / 2
            );
            asteroid.velocity.set(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ).normalize().multiplyScalar(ASTEROID_VELOCITY_MAGNITUDE);

            this.spawn(asteroid);
        }
    }

    public start() {
        document.getElementById('game')!.appendChild(this._renderer.domElement);

        this.createAirplanes();
        this.createAsteroids();
        this.createArenaBorders();

        this.onAnimationFrame();
    }

    public stop() {
        this._gameRunning = false;
        window.removeEventListener('resize', this.onWindowResize, false);
        this._renderer.dispose();
        this._orbitControls.dispose();
        document.getElementById('game')!.removeChild(this._renderer.domElement);
    }

    public teleportWithinArena(position: THREE.Vector3): THREE.Vector3 {
        const newPosition = position.clone();

        if (newPosition.x < -this._arenaSize.x / 2) {
            newPosition.x = this._arenaSize.x / 2;
        } else if (newPosition.x > this._arenaSize.x / 2) {
            newPosition.x = -this._arenaSize.x / 2;
        }

        if (newPosition.y < -this._arenaSize.y / 2) {
            newPosition.y = this._arenaSize.y / 2;
        } else if (newPosition.y > this._arenaSize.y / 2) {
            newPosition.y = -this._arenaSize.y / 2;
        }

        if (newPosition.z < -this._arenaSize.z / 2) {
            newPosition.z = this._arenaSize.z / 2;
        } else if (newPosition.z > this._arenaSize.z / 2) {
            newPosition.z = -this._arenaSize.z / 2;
        }

        return newPosition;
    }

    public spawn(object: GameObject): void {
        this._arenaObjects.push(object);
        this._scene.add(object.object);
    }

    kill(id: number): void {
        const object = this._arenaObjects.find(object => object.id === id);
        if (object) {
            object.kill();
        }
    }

    find(id: number): GameObject | undefined {
        return this._arenaObjects.find(object => object.id === id);
    }

}
