import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CAMERA_ARENA_DISTANCE, CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR, SCENE_BACKGROUND_COLOR, TIME_SCALE_MULT } from './constants';
import { GameSystem, GameHost, Entity, SpawnEntityOpts, EntityComponents, Component, HostGeometries } from '@doggo/ecs';
import { EVENT_TYPES, EventBus, GameEvent, GameEventSubscription } from '@doggo/events';

class EntityComponentsImpl implements EntityComponents {
    private _components: Map<number, Component<any>> = new Map<number, Component<any>>();

    constructor(
        componentsList?: Array<Component<any>>
    ) {
        if (componentsList) {
            for (const component of componentsList) {
                this.set(component);
            }
        }
    }

    public has(componentType: number): boolean {
        return this._components.has(componentType);
    }

    public get<T>(componentType: number): Component<T> | undefined {
        return this._components.get(componentType) as Component<T>;
    }

    public set<T>(component: Component<T>): void {
        this._components.set(component.type, component);
    }

    public remove(componentType: number): void {
        this._components.delete(componentType);
    }

    public all(): IterableIterator<Component<any>> {
        return this._components.values();
    }
}

class HostGeometriesImpl implements HostGeometries {
    private _geometries: Map<string, THREE.BufferGeometry> = new Map<string, THREE.BufferGeometry>();

    constructor() {
        console.log('[HostGeometriesImpl]', "ctor");
    }

    public find(name: string): THREE.BufferGeometry | undefined {
        return this._geometries.get(name);
    }

    public add(name: string, geometry: THREE.BufferGeometry): void {
        this._geometries.set(name, geometry);
    }

    public remove(name: string): void {
        this._geometries.delete(name);
    }

}

type InternalEventSubscription<T> = {
    id: number;
} & GameEventSubscription<T>;

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
    protected _entities: Array<Entity> = [];
    protected _entitiesById: Map<number, Entity> = new Map<number, Entity>();
    protected _geometries: HostGeometries = new HostGeometriesImpl();
    protected _eventBus: EventBus = {
        subscribe: this.subscribeToEvent.bind(this),
        dispatch: this.dispatchEvent.bind(this)
    }
    protected _host: GameHost = {
        geometries: this._geometries,
        entities: this._entities,
        eventBus: this._eventBus,
        spawn: this.spawnEntity.bind(this),
        kill: this.killEntity.bind(this)
    };
    protected _eventSubscriptions: Map<number, Array<InternalEventSubscription<any>>> = new Map<number, Array<InternalEventSubscription<any>>>();
    private _nextEntityId: number = 0;
    private _nextEventSubscriptionId: number = 0;

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

    protected get eventBus(): EventBus {
        return this._eventBus;
    }

    public spawnEntity(opts: SpawnEntityOpts): Entity {
        console.log('[BaseGame]', `Spawning entity with options`, opts);
        const newEntity: Entity = {
            id: this._nextEntityId++,
            alive: true,
            components: new EntityComponentsImpl(opts.components),
            object: new THREE.Object3D()
        };
        if (opts.position) {
            newEntity.object!.position.copy(opts.position);
            console.log('[BaseGame]', `Moving new entity ${newEntity.id} to position ${opts.position.x}, ${opts.position.y}, ${opts.position.z}`);
        }
        if (opts.rotation) {
            newEntity.object!.setRotationFromQuaternion(opts.rotation);
            console.log('[BaseGame]', `Rotating new entity ${newEntity.id} to quaternion ${opts.rotation.x}, ${opts.rotation.y}, ${opts.rotation.z}, ${opts.rotation.w}`);
        }
        console.log('[BaseGame]', `Created new entity`, newEntity);
        this._entities.push(newEntity);
        this._entitiesById.set(newEntity.id, newEntity);
        if (opts.parentId) {
            const parent = this._entitiesById.get(opts.parentId);
            if (parent) {
                parent.object?.add(newEntity.object!);
                console.log('[BaseGame]', `Added entity ${newEntity.id} to parent ${opts.parentId}`);
            } else {
                console.error('[BaseGame]', `Parent entity ${opts.parentId} not found`);
            }
        } else {
            this._scene.add(newEntity.object!);
            console.log('[BaseGame]', `Added entity ${newEntity.id} to scene`);
        }
        console.log('[BaseGame]', `Calling onAddEntity for entity ${newEntity.id}`);
        this.onAddEntity(newEntity);

        console.log('[BaseGame]', `Dispatching ENTITY_SPAWNED event for entity ${newEntity.id}`);
        this._eventBus.dispatch({
            type: EVENT_TYPES.ENTITY_SPAWNED,
            data: newEntity
        });

        return newEntity;
    }

    public killEntity(id: number): void {
        console.log('[BaseGame]', `Killing entity ${id}`);
        const entity = this._entitiesById.get(id);
        if (entity) {
            entity.alive = false;
            this._entitiesById.delete(id);
            const index = this._entities.indexOf(entity);
            if (index > -1) {
                this._entities.splice(index, 1);
            }
            if (entity.object?.parent) {
                entity.object.parent.remove(entity.object);
            } else if (entity.object) {
                this._scene.remove(entity.object);
            } else {
                console.error('[BaseGame]', `Entity ${id} has no object`);
            }

            console.log('[BaseGame]', `Calling onRemoveEntity for entity ${id}`);
            this.onRemoveEntity(entity);

            console.log('[BaseGame]', `Dispatching ENTITY_KILLED event for entity ${id}`);
            this._eventBus.dispatch({
                type: EVENT_TYPES.ENTITY_KILLED,
                data: entity
            });

        } else {
            console.error('[BaseGame]', `Entity ${id} not found`);
        }
    }

    public start(el: HTMLElement): void {
        console.log('[BaseGame]', "start");
        this.initSystems();
        this.onInit();
        el.appendChild(this._renderer.domElement);
        console.log('[BaseGame]', "starting animation frame ...");
        this.onAnimationFrame();
    }

    public stop(): void {
        console.log('[BaseGame]', "stop");
        this._gameRunning = false;

        console.log('[BaseGame]', "removing EventListeners ...");
        window.removeEventListener('resize', this.onWindowResize, false);

        console.log('[BaseGame]', "removing DOM elements ...");
        this._renderer.domElement.remove();
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

        this.updateRenderer(delta);

        if (this._gameRunning) {
            requestAnimationFrame(this.onAnimationFrame.bind(this));
        } else {
            console.log(`[BaseGame]`, `Game stopped, not requesting next frame`);
        }
    }

    private subscribeToEvent<T>(type: number, callback: (event: GameEvent<T>) => void): GameEventSubscription<T> {

        const subscriptionId = this._nextEventSubscriptionId++;
        console.log('[BaseGame]', `Subscribing to event ${type} with subscriptionId ${subscriptionId}`);
        const cancel = () => {
            const subscriptions = this._eventSubscriptions.get(type);
            if (subscriptions) {
                const index = subscriptions.findIndex(s => s.id === subscriptionId);
                if (index > -1) {
                    subscriptions.splice(index, 1);
                }
            }
        };
        const subscription: InternalEventSubscription<T> = {
            id: subscriptionId,
            type,
            callback,
            cancel
        };

        const subscriptions = this._eventSubscriptions.get(type);
        if (subscriptions) {
            subscriptions.push(subscription);
        } else {
            this._eventSubscriptions.set(type, [subscription]);
        }

        return subscription;
    }

    private dispatchEvent<T>(event: GameEvent<T>): void {
        console.log('[BaseGame]', `Dispatching event`, event);
        const subscriptions = this._eventSubscriptions.get(event.type);
        if (subscriptions) {
            for (const subscription of subscriptions) {
                subscription.callback(event);
            }
        }
    }

    private onWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

    protected onRemoveEntity(entity: Entity) {
        console.log('[BaseGame]', `onRemoveEntity`, entity);
    }

    protected onAddEntity(entity: Entity) {
        console.log('[BaseGame]', `onAddEntity`, entity);
    }

    protected onInit() {
        console.log('[BaseGame]', `onInit`, this);
    }

    protected removeDeadEntities() {
        const entitiesToRemove = this._entities.filter(e => !e.alive);
        for (const entity of entitiesToRemove) {
            console.warn('[BaseGame]', `Removing dead entity ${entity.id}`);
            this.killEntity(entity.id);
        }
    }

    protected updateGameLogic(delta: number) {
        this.updateDelta(delta);
        this._updateAccumulator += delta;
        this.removeDeadEntities();
        while (this._updateAccumulator >= this._simulationTimestep) {
            this._updateAccumulator -= this._simulationTimestep;
            this.updateFixed(this._simulationTimestep);
            this.removeDeadEntities();
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

    protected updateRenderer(delta: number) {
        this._orbitControls.update(delta);
        this._renderer.render(this._scene, this._camera);
    }

}