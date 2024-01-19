import { $registerRoute, $router } from "@doggo/router";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class MatchGame {

    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _orbitControls: OrbitControls;
    private _lastFrame: number = new Date().getTime();
    private _gameRunning: boolean = true;

    constructor() {
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(0x000000);

        const fov = 80; // field of view
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.1;
        const far = 1000;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(10, 10, 10);

        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        console.log(`[MatchGame]`, `Renderer created`, this._renderer);

        this._orbitControls = new OrbitControls(this._camera, this._renderer.domElement);
        this._orbitControls.update();

        window.addEventListener('resize', this.onWindowResize, false);
    }

    private onAnimationFrame() {
        const now = new Date().getTime();
        const delta = now - this._lastFrame;
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
        this._renderer.render(this._scene, this._camera);
    }

    public start() {
        document.getElementById('game')!.appendChild(this._renderer.domElement);
        this.onAnimationFrame();
    }

    public stop() {
        this._gameRunning = false;
        window.removeEventListener('resize', this.onWindowResize, false);
        this._renderer.dispose();
        this._orbitControls.dispose();
        document.getElementById('game')!.removeChild(this._renderer.domElement);
    }
}

export function Match() {

    const gameRef = useRef<MatchGame>();

    useEffect(
        () => {
            console.log(`[Match]`, `Creating match view`);
            gameRef.current = new MatchGame();
            gameRef.current.start();

            return () => {
                console.log(`[Match]`, `Destroying match view`);
                gameRef.current?.stop();
            }
        },
        []
    );

    const backToMainMenu = () => {
        $router.goto('main-menu');
    };

    return <div>
        <h1>Match</h1>
        <button onClick={backToMainMenu}>Back to main menu</button>
    </div>
}

$registerRoute({
    name: 'match',
    component: Match
});
