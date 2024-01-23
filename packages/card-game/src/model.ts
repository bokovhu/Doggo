
export type UnitKind = "fighter" | "helicopter" | "bomber";
export type GameCardKind = "spawn" | "effect" | "nothing";
export type EffectTargetOnUnitEffect = "this-plane" | // Effect is applied to the plane, that the effect is attached to
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
export type EffectTargetOnPlayerEffect = "all-own-planes" | // Effect is applied to all own planes
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
export type EffectTarget = EffectTargetOnUnitEffect | EffectTargetOnPlayerEffect;
export type EffectKind = "direct-damage" | // Target is damaged for a fixed value
    "direct-heal" | // Target is healed for a fixed value
    "affect-ap" | // Target's AP is affected by a fixed value
    "affect-dp" | // Target's DP is affected by a fixed value
    "affect-man"; // Target's MAN is affected by a fixed value
export type PlaneEffectTrigger = "on-spawn";// Effect is activated when the effect is attached to a plane, and the plane is spawned
// "on-killed" | // Effect is activated when the effect is attached to a plane, and the plane is killed
// "on-target-killed"; // Effect is activated when the effect is attached to a plane, and the plane kills a target
export type CardEffectTrigger = "once" | // Effect is activated once, at the beginning of the match
    "any-own-plane-killed" | // Effect is activated when any own plane is killed
    "any-own-plane-of-kind-killed" | // Effect is activated when any own plane of a specific kind is killed
    "any-enemy-plane-killed" | // Effect is activated when any enemy plane is killed
    "any-enemy-plane-of-kind-killed" | // Effect is activated when any enemy plane of a specific kind is killed
    "any-plane-killed" | // Effect is activated when any plane is killed
    "any-plane-of-kind-killed"; // Effect is activated when any plane of a specific kind is killed
export type EffectTrigger = PlaneEffectTrigger | CardEffectTrigger;

export interface GameEffect {
    /** The effect's target */
    target: EffectTarget;

    /** The target's plane kind argument, if any */
    targetKind?: UnitKind;

    /** The target's count argument, if any */
    targetCount?: number;

    /** The effect's kind */
    kind: EffectKind;

    /** The effect's trigger */
    trigger: EffectTrigger;

    /** The activation plane argument, if any */
    triggerUnitKind?: UnitKind;

    /** The effect's value */
    value: number;
}

export type GameEffectOnUnit = GameEffect & {
    trigger: PlaneEffectTrigger;
    target: EffectTargetOnUnitEffect;
}

export type GameEffectOnPlayer = GameEffect & {
    trigger: CardEffectTrigger;
    target: EffectTargetOnPlayerEffect;
}

export interface GameCardSpawnDetails {
    /** The airplane kind to spawn */
    kind: UnitKind;

    /** The amount of planes to spawn */
    amount: number;

    /** The card's generated attributes for the combat simulation */
    attributes: {
        /** The airplane's health.
         */
        hp: number;

        /** The airplane's attack power.
         */
        ap: number;

        /** The airplane's manouverability.
         */
        man: number;

        /** The airplane's defense power.
         */
        dp: number;
    };

    /** The card's generated effects, that are added to the plane's that are spawned. */
    effects: Array<GameEffect & { trigger: PlaneEffectTrigger }>;
}

export interface GameCardEffectDetails {
    /** The card's generated effects */
    effects: Array<GameEffect & { trigger: CardEffectTrigger }>;
}

export type GameCardRarity = "common" | "rare" | "legendary";

export interface GameCard {
    /** The 32-bit unsigned integer ID of the card (also the seed) */
    id: number;

    /** The card's rarity */
    rarity: GameCardRarity;

    /** The card's kind */
    kind: GameCardKind;

    /** The card's spawn details */
    spawnDetails?: GameCardSpawnDetails;

    /** The card's effect details */
    effectDetails?: GameCardEffectDetails;
}

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
    "spawn-n-units" | // N units are spawned
    "spawn-unit" | // A unit is spawned
    "activate-effect" | // An effect is activated
    "play-effect" | // An effect is played (will be activated later)
    "change-hp" | // A unit's HP is changed
    "change-ap" | // A unit's AP is changed
    "change-dp" | // A unit's DP is changed
    "change-man" | // A unit's MAN is changed
    "move-unit" | // A unit is moved
    "target-unit" | // A unit is targeted
    "attack-unit" | // A unit is attacked
    "kill-unit" | // A unit is killed
    "reinforce" | // The playing deck is extended with a player's reinforcement card
    "shuffle-units" | // The units are shuffled
    "win" | // A player wins the match
    "end-card-play" | // A card's play effects are ended
    "end-effect-activate-consequences"; // An effect's activate consequences are ended

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

export interface PlayerCommand {
    /** The card that is selected by the player. */
    card: GameCard;
}

export interface GameMatch {
    /** The seed of the match */
    seed: number;

    /** The number of the player who won the match */
    winner: number;

    /** The commands of the players */
    commands: Array<Array<PlayerCommand>>;

    /** The turns of the match */
    events: Array<GameEvent>;
}
