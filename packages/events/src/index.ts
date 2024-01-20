export interface GameEvent<T> {
    /** The type of the event. */
    type: number;

    /** The data associated with the event. */
    data?: T;
}

export interface GameEventSubscription<T> {
    /** The type of the event. */
    type: number;

    /** The callback to invoke when the event is dispatched. */
    callback: (event: GameEvent<T>) => void;

    /** Cancels the subscription. */
    cancel(): void;
}

/** The event subscription host is responsible for accepting event subscriptions */
export interface EventSubscriptionHost {
    /** Subscribes to an event. */
    subscribe<T>(type: number, callback: (event: GameEvent<T>) => void): GameEventSubscription<T>;
}

/** The event dispatch host is responsible for dispatching events */
export interface EventDispatchHost {
    /** Dispatches an event. */
    dispatch<T>(event: GameEvent<T>): void;
}

/** The event bus, responsible for delivering the events */
export type EventBus = EventSubscriptionHost & EventDispatchHost;

export const EVENT_TYPES = {
    ENTITY_SPAWNED: 1,
    ENTITY_KILLED: 2,
    ENTITY_COMPONENT_ADDED: 3,
    ENTITY_COMPONENT_REMOVED: 4,
};
