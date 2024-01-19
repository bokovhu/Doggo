import * as THREE from 'three';

/** A component, which is a piece of data with a type for game logic. */
export interface Component<T> {
    /** The component's type. */
    readonly type: number;

    /** The component's data. */
    readonly data: T;
}

/** The component container of an entity */
export interface EntityComponents {
    has(componentType: number): boolean;
    get<T>(componentType: number): Component<T> | undefined;
    set<T>(component: Component<T>): void;
    remove(componentType: number): void;
    all(): IterableIterator<Component<any>>;
}

/** A game entity, which is something, that exists in the game world, and contains components. */
export interface Entity {
    /** The entity's unique identifier. */
    readonly id: number;

    /** Whether or not the entity is alive. */
    readonly alive: boolean;

    /** The entity's components. */
    readonly components: EntityComponents;

    /** The THREE.js object associated with the entity. */
    readonly object: THREE.Object3D | undefined;
}

/** A host module, that stores common geometries, so that they are only created once. */
export interface HostGeometries {
    /** Retrieves a geometry by its name. */
    find(name: string): THREE.BufferGeometry | undefined;

    /** Adds a geometry to the host. */
    add(name: string, geometry: THREE.BufferGeometry): void;

    /** Removes a geometry from the host. */
    remove(name: string): void;
}

export interface SpawnEntityOpts {
    position?: THREE.Vector3;
    rotation?: THREE.Euler;
    parentId?: number;
    components?: Array<Component<any>>;
}

/** The game host, as visible to systems, which implement the game logic. */
export interface GameHost {
    readonly geometries: HostGeometries;
    readonly entities: IterableIterator<Entity>;

    spawn(opts: SpawnEntityOpts): Entity;
    kill(id: number): void;
}

export interface GameSystem {
    init?(
        host: GameHost
    ): void;

    update?(
        host: GameHost,
        delta: number
    ): void;

    updateFixed?(
        host: GameHost,
        delta: number
    ): void;
}