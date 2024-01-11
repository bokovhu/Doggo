import { $registerRoute, $router } from "@alephhack/router";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface AirplaneState {
    position: [number, number, number];
    velocity: number;
    up: [number, number, number];
    forward: [number, number, number];
    right: [number, number, number];
}

interface AirplaneControls {
    pitch: number;
    yaw: number;
    roll: number;
    throttle: number;
    brake: number;
}

interface AirplaneParameters {
    maxSpeed: number;
    throttleForce: number;
    reverseForce: number;
    brakeForce: number;
    rollSpeed: number;
    pitchSpeed: number;
    yawSpeed: number;
}

interface IArena {
    readonly arenaSize: THREE.Vector3;
    readonly arenaCenter: THREE.Vector3;
}

type AirplaneAI = (state: AirplaneState) => AirplaneControls;

const rollingAirplaneAI: AirplaneAI = (state: AirplaneState) => {
    return {
        pitch: 1.0,
        yaw: 0.1,
        roll: 0.3,
        throttle: Math.random(),
        brake: 0
    };
}

class Airplane {

    private _position: THREE.Vector3 = new THREE.Vector3();
    private _velocity: number = 0;
    private _up: THREE.Vector3 = new THREE.Vector3(0, 1, 0);
    private _forward: THREE.Vector3 = new THREE.Vector3(0, 0, 1);
    private _right: THREE.Vector3 = new THREE.Vector3(1, 0, 0);
    private _rotation: THREE.Quaternion = new THREE.Quaternion();
    private _object: THREE.Object3D = new THREE.Object3D();

    constructor(
        private _arena: IArena,
        private _ai: AirplaneAI,
        private _parameters: AirplaneParameters
    ) {
        const geometry = new THREE.BoxGeometry(
            0.2,
            0.1,
            0.4
        );
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this._object.add(cube);
    }

    get position(): THREE.Vector3 {
        return this._position;
    }

    get velocity(): number {
        return this._velocity;
    }

    get up(): THREE.Vector3 {
        return this._up;
    }

    get forward(): THREE.Vector3 {
        return this._forward;
    }

    get right(): THREE.Vector3 {
        return this._right;
    }

    get rotation(): THREE.Quaternion {
        return this._rotation;
    }

    get state(): AirplaneState {
        return {
            position: [this._position.x, this._position.y, this._position.z],
            velocity: this._velocity,
            up: [this._up.x, this._up.y, this._up.z],
            forward: [this._forward.x, this._forward.y, this._forward.z],
            right: [this._right.x, this._right.y, this._right.z]
        };
    }

    get object(): THREE.Object3D {
        return this._object;
    }

    public update(delta: number) {
        const controls = this._ai(this.state);

        // Turning of aircraft
        const deltaYaw = new THREE.Quaternion().setFromAxisAngle(
            this._up,
            controls.yaw * this._parameters.yawSpeed * delta
        );
        const deltaPitch = new THREE.Quaternion().setFromAxisAngle(
            this._right,
            controls.pitch * this._parameters.pitchSpeed * delta
        );
        const deltaRoll = new THREE.Quaternion().setFromAxisAngle(
            this._forward,
            controls.roll * this._parameters.rollSpeed * delta
        );
        this._rotation.multiply(deltaYaw);
        this._rotation.multiply(deltaPitch);
        this._rotation.multiply(deltaRoll);

        // Recalculate axes
        this._forward.set(0, 0, 1).applyQuaternion(this._rotation);
        this._up.set(0, 1, 0).applyQuaternion(this._rotation);
        this._right.set(1, 0, 0).applyQuaternion(this._rotation);

        // Acceleration
        let acceleration = 0.0;
        if (controls.throttle > 0) {
            acceleration += controls.throttle * this._parameters.throttleForce;
        } else if (controls.throttle < 0) {
            acceleration += controls.throttle * this._parameters.reverseForce;
        }
        if (Math.abs(this._velocity) > 0) {
            const breakAmount = controls.brake * this._parameters.brakeForce * Math.sign(this._velocity);
            if (Math.abs(breakAmount) < Math.abs(this._velocity)) {
                acceleration -= breakAmount;
            } else {
                acceleration = 0;
                this._velocity = 0;
            }
        }
        this._velocity += acceleration * delta;

        if (this._velocity > this._parameters.maxSpeed) {
            this._velocity = this._parameters.maxSpeed;
        } else if (this._velocity < -this._parameters.maxSpeed) {
            this._velocity = -this._parameters.maxSpeed;
        }

        // Movement
        this._position.add(this._forward.clone().multiplyScalar(this._velocity * delta));

        // Arena bounds (teleport)
        if (this._position.x < -this._arena.arenaSize.x / 2) {
            this._position.x = this._arena.arenaSize.x / 2;
        } else if (this._position.x > this._arena.arenaSize.x / 2) {
            this._position.x = -this._arena.arenaSize.x / 2;
        }
        if (this._position.y < -this._arena.arenaSize.y / 2) {
            this._position.y = this._arena.arenaSize.y / 2;
        } else if (this._position.y > this._arena.arenaSize.y / 2) {
            this._position.y = -this._arena.arenaSize.y / 2;
        }
        if (this._position.z < -this._arena.arenaSize.z / 2) {
            this._position.z = this._arena.arenaSize.z / 2;
        } else if (this._position.z > this._arena.arenaSize.z / 2) {
            this._position.z = -this._arena.arenaSize.z / 2;
        }

        // Apply to object
        this._object.position.set(this._position.x, this._position.y, this._position.z);
        this._object.setRotationFromQuaternion(this._rotation);

    }
}

class TrainGame implements IArena {

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
    private _airplanes: Array<Airplane> = [];
    private _updateAccumulator: number = 0;
    private _airplaneTimestep: number = 1.0 / 60.0;

    constructor() {
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(0x000000);

        const fov = 80; // field of view
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.1;
        const far = 1000;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(
            this._arenaSize.x + 2,
            this._arenaSize.y + 2,
            this._arenaSize.z + 2
        );
        this._camera.lookAt(this._arenaCenter);

        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        console.log(`[MatchGame]`, `Renderer created`, this._renderer);

        this._orbitControls = new OrbitControls(this._camera, this._renderer.domElement);
        this._orbitControls.update();

        window.addEventListener('resize', this.onWindowResize, false);
    }

    private onAnimationFrame() {
        const now = new Date().getTime();
        const delta = (now - this._lastFrame) / 1000.0;
        this._lastFrame = now;

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

    private updateGameLogic(delta: number) {
        this._orbitControls.update();

        this._updateAccumulator += delta;

        while (this._updateAccumulator >= this._airplaneTimestep) {
            this._airplanes.forEach(airplane => airplane.update(this._airplaneTimestep));
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
        const numPlanes = 5;

        for (let i = 0; i < numPlanes; i++) {
            const airplane = new Airplane(
                this,
                rollingAirplaneAI,
                {
                    maxSpeed: 7,
                    throttleForce: 40,
                    reverseForce: 0.1,
                    brakeForce: 10,
                    rollSpeed: 10,
                    pitchSpeed: 1,
                    yawSpeed: 1
                }
            );

            airplane.position.set(
                1 + (this.arenaSize.x - 2) / numPlanes * i,
                this.arenaSize.y / 2,
                -this.arenaSize.z / 2 + 1
            );

            this._airplanes.push(airplane);
            this._scene.add(airplane.object);
        }
    }

    public start() {
        document.getElementById('game')!.appendChild(this._renderer.domElement);

        this.createAirplanes();
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

    get arenaSize() {
        return this._arenaSize;
    }

    get arenaCenter() {
        return this._arenaCenter;
    }

}

export function Train() {

    const gameRef = useRef<TrainGame>();

    useEffect(
        () => {
            console.log(`[Train]`, `Starting game`);
            gameRef.current = new TrainGame();
            gameRef.current.start();
            return () => {
                console.log(`[Train]`, `Stopping game`);
                gameRef.current?.stop();
            };
        },
        []
    )

    const backToMainMenu = () => {
        $router.goto('main-menu');
    };

    return <div>
        <h1>Train</h1>
        <button onClick={backToMainMenu}>Back to main menu</button>
    </div>
}

$registerRoute({
    name: 'train',
    component: Train
});
