import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CAMERA_ARENA_DISTANCE, CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, SCENE_BACKGROUND_COLOR, TIME_SCALE_MULT } from './constants';
import { GameSystem, GameHost, Entity } from '@doggo/ecs';

export class BaseGame {

    protected _scene: THREE.Scene;
    protected _camera: THREE.PerspectiveCamera;
    protected _renderer: THREE.WebGLRenderer;
    protected _orbitControls: OrbitControls;
    protected _lastFrame: number = new Date().getTime();
    protected _gameRunning: boolean = true;
    protected _arenaSize: THREE.Vector3 = new THREE.Vector3(10, 10, 10);
    protected _arenaCenter: THREE.Vector3 = new THREE.Vector3(
        this._arenaSize.x / 2,
        this._arenaSize.y / 2,
        this._arenaSize.z / 2
    );
    protected _updateAccumulator: number = 0;
    protected _simulationTimestep: number = 1.0 / 60.0;
    protected _timescale: number = 1 * TIME_SCALE_MULT;
    protected _raycaster: THREE.Raycaster = new THREE.Raycaster();
    protected _systems: Array<GameSystem> = [];
    protected _host: GameHost = {
        geometries: {
            find: (name: string): THREE.BufferGeometry | undefined => {
                return undefined;
            },
            add: (name: string, geometry: THREE.BufferGeometry): void => {

            },
            remove: (name: string): void => {

            }
        },
        entities: [].values(),
        spawn: (opts: any): any => {
            return undefined;
        },
        kill: (id: number): void => {

        }
    };

    constructor() {
        console.log('[BaseGame]', "ctor");

        console.log('[BaseGame]', "creating Scene ...");
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(SCENE_BACKGROUND_COLOR);
        console.log('[BaseGame]', "created Scene", this._scene);

        console.log('[BaseGame]', "creating Camera ...");
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
        console.log('[BaseGame]', "created Camera", this._camera);

        console.log('[BaseGame]', "creating Renderer ...");
        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        console.log('[BaseGame]', "created Renderer", this._renderer);

        console.log('[BaseGame]', "creating OrbitControls ...");
        this._orbitControls = new OrbitControls(this._camera, this._renderer.domElement);
        this._orbitControls.update();
        console.log('[BaseGame]', "created OrbitControls", this._orbitControls);

        console.log('[BaseGame]', "adding EventListeners ...");
        window.addEventListener('resize', this.onWindowResize, false);
    }

    protected get host(): GameHost {
        return this._host;
    }

    public start(el: HTMLElement): void {
        console.log('[BaseGame]', "start");
        this.initSystems();
        el.appendChild(this._renderer.domElement);
        this.onAnimationFrame();
    }

    private initSystems(): void {
        console.log('[BaseGame]', "initSystems");
        for (const system of this._systems) {
            if (system.init) {
                console.log('[BaseGame]', "Initializing system", system);
                system.init(this.host);
            } else {
                console.log('[BaseGame]', "System has no init function", system);
            }
        }
    }

    private onAnimationFrame() {
        const now = new Date().getTime();
        const delta = (now - this._lastFrame) / 1000.0 * this._timescale;
        this._lastFrame = now;

        this.updateGameLogic(delta);

        if (this._gameRunning) {
            requestAnimationFrame(this.onAnimationFrame.bind(this));
        } else {
            console.log(`[BaseGame]`, `Game stopped, not requesting next frame`);
        }
    }

    private onWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

    protected updateGameLogic(delta: number) {
        this.updateDelta(delta);
        this._updateAccumulator += delta;
        while (this._updateAccumulator >= this._simulationTimestep) {
            this._updateAccumulator -= this._simulationTimestep;
            this.updateFixed(this._simulationTimestep);
        }
    }

    protected updateDelta(delta: number) {
        for (const system of this._systems) {
            if (system.update) {
                system.update(this.host, delta);
            }
        }
    }

    protected updateFixed(fixedDelta: number) {
        for (const system of this._systems) {
            if (system.updateFixed) {
                system.updateFixed(this.host, fixedDelta);
            }
        }
    }

}