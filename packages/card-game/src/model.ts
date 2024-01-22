
export type UnitKind = "fighter" | "supply" | "heal";
export type GameCardKind = "spawn" | "effect" | "nothing";
export type EffectTarget = "this-plane" | // Effect is applied to the plane, that the effect is attached to
    "all-own-planes" | // Effect is applied to all own planes
    "all-own-planes-of-kind" | // Effect is applied to all own planes of a specific kind
    "some-own-planes" | // Effect is applied to some (N) own planes
    "some-own-planes-of-kind" | // Effect is applied to some (N) own planes of a specific kind
    "all-enemy-planes" | // Effect is applied to all enemy planes
    "all-enemy-planes-of-kind" | // Effect is applied to all enemy planes of a specific kind
    "some-enemy-planes" | // Effect is applied to some (N) enemy planes
    "some-enemy-planes-of-kind" | // Effect is applied to some (N) enemy planes of a specific kind
    "all-planes" | // Effect is applied to all planes
    "all-planes-of-kind" | // Effect is applied to all planes of a specific kind
    "some-planes" | // Effect is applied to some (N) planes
    "some-planes-of-kind"; // Effect is applied to some (N) planes of a specific kind
export type EffectKind = "direct-damage" | // Target is damaged for a fixed value
    "direct-heal" | // Target is healed for a fixed value
    "affect-ap" | // Target's AP is affected by a fixed value
    "affect-dp" | // Target's DP is affected by a fixed value
    "affect-man"; // Target's MAN is affected by a fixed value
export type PlaneEffectActivation = "on-spawn" | // Effect is activated when the effect is attached to a plane, and the plane is spawned
    "on-killed" | // Effect is activated when the effect is attached to a plane, and the plane is killed
    "on-target-killed" | // Effect is activated when the effect is attached to a plane, and the plane kills a target
    "every-turn"; // Effect is activated every turn
export type CardEffectActivation = "once" | // Effect is activated once, at the beginning of the match
    "any-own-plane-killed" | // Effect is activated when any own plane is killed
    "any-own-plane-of-kind-killed" | // Effect is activated when any own plane of a specific kind is killed
    "any-enemy-plane-killed" | // Effect is activated when any enemy plane is killed
    "any-enemy-plane-of-kind-killed" | // Effect is activated when any enemy plane of a specific kind is killed
    "any-plane-killed" | // Effect is activated when any plane is killed
    "any-plane-of-kind-killed" | // Effect is activated when any plane of a specific kind is killed
    "every-turn"; // Effect is activated every turn
export type EffectActivation = PlaneEffectActivation | CardEffectActivation;

export interface GameEffect {
    /** The effect's target */
    target: EffectTarget;

    /** The target's plane kind argument, if any */
    targetKind?: UnitKind;

    /** The target's count argument, if any */
    targetCount?: number;

    /** The effect's kind */
    kind: EffectKind;

    /** The effect's activation */
    activation: EffectActivation;

    /** The activation plane argument, if any */
    activationKind?: UnitKind;

    /** The effect's value */
    value: number;
}

export interface GameCardSpawnDetails {
    /** The airplane kind to spawn */
    kind: UnitKind;

    /** The amount of planes to spawn */
    amount: number;

    /** The card's generated attributes for the combat simulation */
    attributes: {
        /** The airplane's health.
         * 
         * * Fighter: [50; 200]
         * * Supply: [100; 500]
         * * Heal: [50; 500]
         */
        health: number;

        /** The airplane's attack power.
         * 
         * * Fighter: [1; 10]
         * * Supply: 0
         * * Heal: 0
         */
        attack: number;

        /** The airplane's manouverability.
         * 
         * * Fighter: [1; 10]
         * * Supply: [1; 3]
         * * Heal: [1; 5]
         */
        manouverability: number;
    };

    /** The card's generated effects, that are added to the plane's that are spawned. */
    effects: Array<GameEffect & { activation: PlaneEffectActivation }>;
}

export interface GameCardEffectDetails {
    /** The card's generated effects */
    effects: Array<GameEffect & { activation: CardEffectActivation }>;
}

export interface GameCard {
    /** The 32-bit unsigned integer ID of the card (also the seed) */
    id: number;

    /** The card's kind */
    kind: GameCardKind;

    /** The card's spawn details */
    spawnDetails?: GameCardSpawnDetails;

    /** The card's effect details */
    effectDetails?: GameCardEffectDetails;
}

export type GameCoordinates = [
    "A" | "B" | "C" | "D" | "E" | "F",
    1 | 2 | 3 | 4
];

export interface Unit {
    /** The id of the unit */
    id: number;

    /** The unit's kind */
    kind: UnitKind;

    /** The unit's health */
    hp: number;

    /** The unit's attack power */
    ap: number;

    /** The unit's defense power */
    dp: number;

    /** The unit's manouverability */
    man: number;

    /** The position of the plane */
    position: GameCoordinates;

    /** The number of the player who owns this unit */
    owner: number;

    /** The unit's current target */
    target: number;
}

export type GameEventKind = "begin-game" | // The game begins
    "commit-commands" | // The player commits the commands for the match
    "begin-turn" | // A new turn begins
    "add-to-playing-deck" | // A card is added to the playing deck
    "shuffle-playing-deck" | // The playing deck is shuffled
    "play-card" | // A card is played from the top of the playing deck
    "spawn-unit" | // A unit is spawned
    "activate-effect" | // An effect is activated
    "change-hp" | // A unit's HP is changed
    "change-ap" | // A unit's AP is changed
    "change-dp" | // A unit's DP is changed
    "change-man" | // A unit's MAN is changed
    "move-unit" | // A unit is moved
    "target-unit" | // A unit is targeted
    "attack-unit" | // A unit is attacked
    "kill-unit" | // A unit is killed
    "reinforce" | // The playing deck is extended with a player's reinforcement card
    "win"; // A player wins the match

export interface GameEvent {
    /** The event's turn number */
    turn: number;

    /** The event's sequence number in all events */
    sequence: number;

    /** The event's kind */
    kind: GameEventKind;

    /** The number of the player to which this event occured */
    player?: number;

    /** The event's data */
    data: any;
}

export interface GameMatch {
    /** The seed of the match */
    seed: number;

    /** The number of the player who won the match */
    winner: number;

    /** The turns of the match */
    events: Array<GameEvent>;
}
