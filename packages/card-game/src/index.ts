import { GameRandoms, GameRng } from "@doggo/game-random";

export type AirplaneKind = "fighter" | "supply" | "heal";
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
export type EffectKind = "direct-damage" | // Target is damaged for a fixed value at the beginning of the turn
    "direct-heal" | // Target is healed for a fixed value at the beginning of the turn
    "affect-damage-roll" | // Target's damage roll is affected by a fixed value
    "affect-attack"; // Target's attack is affected by a fixed value
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
    targetKind?: AirplaneKind;

    /** The target's count argument, if any */
    targetCount?: number;

    /** The effect's kind */
    kind: EffectKind;

    /** The effect's activation */
    activation: EffectActivation;

    /** The effect's value */
    value: number;
}

export interface GameCardSpawnDetails {
    /** The airplane kind to spawn */
    kind: AirplaneKind;

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

export function formatEffectDescription(effect: GameEffect) {
    const activationDescriptions: Record<EffectActivation, (eff: GameEffect) => string> = {
        "every-turn": eff => `Every turn`,
        "on-killed": eff => `When killed`,
        "on-spawn": eff => `When spawned`,
        "on-target-killed": eff => `When killing a target`,
        "once": eff => `Once`,
        "any-own-plane-killed": eff => `When an own plane is killed`,
        "any-own-plane-of-kind-killed": eff => `When an own ${eff.targetKind} plane is killed`,
        "any-enemy-plane-killed": eff => `When an enemy plane is killed`,
        "any-enemy-plane-of-kind-killed": eff => `When an enemy ${eff.targetKind} plane is killed`,
        "any-plane-killed": eff => `When a plane is killed`,
        "any-plane-of-kind-killed": eff => `When a ${eff.targetKind} plane is killed`,
    };
    const kindDescriptions: Record<EffectKind, (eff: GameEffect) => string> = {
        "affect-attack": eff => eff.value > 0 ? `Increases attack by ${eff.value}` : `Decreases attack by ${-eff.value}`,
        "affect-damage-roll": eff => eff.value > 0 ? `Increases damage roll by ${eff.value}` : `Decreases damage roll by ${-eff.value}`,
        "direct-damage": eff => `Deals ${eff.value} damage`,
        "direct-heal": eff => `Heals for ${eff.value}`,
    };
    const targetDescriptions: Record<EffectTarget, (eff: GameEffect) => string> = {
        "all-enemy-planes": eff => `All enemy planes`,
        "all-enemy-planes-of-kind": eff => `All enemy ${eff.targetKind} planes`,
        "all-own-planes": eff => `All own planes`,
        "all-own-planes-of-kind": eff => `All own ${eff.targetKind} planes`,
        "all-planes": eff => `All planes`,
        "all-planes-of-kind": eff => `All ${eff.targetKind} planes`,
        "some-enemy-planes": eff => `${eff.targetCount} random enemy planes`,
        "some-enemy-planes-of-kind": eff => `${eff.targetCount} random enemy ${eff.targetKind} planes`,
        "some-own-planes": eff => `${eff.targetCount} random own planes`,
        "some-own-planes-of-kind": eff => `${eff.targetCount} random own ${eff.targetKind} planes`,
        "some-planes": eff => `${eff.targetCount} random planes`,
        "some-planes-of-kind": eff => `${eff.targetCount} random ${eff.targetKind} planes`,
        "this-plane": eff => `This plane`
    };

    const activationDescription = activationDescriptions[effect.activation](effect);
    const kindDescription = kindDescriptions[effect.kind](effect).toLowerCase();
    const targetDescription = targetDescriptions[effect.target](effect).toLowerCase();

    return `${activationDescription}, ${kindDescription} to ${targetDescription}.`;
}

export function formatCardDescription(card: GameCard) {

    if (card.kind === "spawn") {
        let result = `SPAWN | Spawns **${card.spawnDetails!.amount}** plane(s) of the **${card.spawnDetails!.kind}** kind`;

        if (card.spawnDetails!.effects.length > 0) {
            for (const effect of card.spawnDetails!.effects) {
                result += ` (${formatEffectDescription(effect)})`;
            }
        }

        return result;
    } else if (card.kind === "effect") {
        let result = `EFFECT | `;

        if (card.effectDetails!.effects.length > 0) {
            for (const effect of card.effectDetails!.effects) {
                result += ` ${formatEffectDescription(effect)}`;
            }
        }

        return result;
    } else {
        return "NOTHING | Does nothing";
    }

}

export class GameCardGenerator {

    constructor() {

    }

    private generatePlaneEffect(rng: GameRng): GameEffect & { activation: PlaneEffectActivation } {
        const activation = rng() < 0.5 ? "on-spawn" : rng() < 0.5 ? "on-killed" : "on-target-killed";
        const target = rng() < 0.5 ? "this-plane" : rng() < 0.5 ? "all-own-planes" : "all-enemy-planes";
        const targetKind = rng() < 0.5 ? undefined : rng() < 0.5 ? "fighter" : rng() < 0.5 ? "supply" : "heal";
        const value = Math.floor(rng() * 1000) + 1;

        const kind = rng() < 0.5 ? "direct-damage" : rng() < 0.5 ? "direct-heal" : rng() < 0.5 ? "affect-damage-roll" : "affect-attack";

        return {
            activation,
            target,
            targetKind,
            kind,
            value
        };
    }

    private generateCardEffect(rng: GameRng): GameEffect & { activation: CardEffectActivation } {
        const activation = rng() < 0.5 ? "once" : rng() < 0.5 ? "every-turn" : rng() < 0.5 ? "any-own-plane-killed" : rng() < 0.5 ? "any-enemy-plane-killed" : "any-plane-killed";
        const target = rng() < 0.5 ? "all-own-planes" : rng() < 0.5 ? "all-enemy-planes" : "all-planes";
        const targetKind = rng() < 0.5 ? undefined : rng() < 0.5 ? "fighter" : rng() < 0.5 ? "supply" : "heal";
        const targetCount = Math.floor(rng() * 3) + 1;
        const value = Math.floor(rng() * 1000) + 1;

        const kind = rng() < 0.5 ? "direct-damage" : rng() < 0.5 ? "direct-heal" : rng() < 0.5 ? "affect-damage-roll" : "affect-attack";

        return {
            activation,
            target,
            targetKind,
            targetCount,
            kind,
            value
        };
    }

    private generateSpawnCard(id: number, rng: GameRng): GameCard {

        const kind = rng() < 0.8 ? "fighter" : rng() < 0.8 ? "supply" : "heal";
        const amount = Math.floor(rng() * 3) + 1;

        const attributes = {
            health: 0,
            attack: 0,
            manouverability: 0
        };

        if (kind === "fighter") {
            attributes.health = Math.floor(rng() * 150) + 50;
            attributes.attack = Math.floor(rng() * 10) + 1;
            attributes.manouverability = Math.floor(rng() * 10) + 1;
        } else if (kind === "supply") {
            attributes.health = Math.floor(rng() * 400) + 100;
            attributes.attack = 0;
            attributes.manouverability = Math.floor(rng() * 3) + 1;
        } else if (kind === "heal") {
            attributes.health = Math.floor(rng() * 450) + 50;
            attributes.attack = 0;
            attributes.manouverability = Math.floor(rng() * 5) + 1;
        }

        const effects: Array<GameEffect & { activation: PlaneEffectActivation }> = [];

        const effectCount = Math.floor(rng() * 3);
        for (let i = 0; i < effectCount; i++) {
            effects.push(this.generatePlaneEffect(rng));
        }

        return {
            id,
            kind: "spawn",
            spawnDetails: {
                kind,
                amount,
                attributes,
                effects
            }
        };
    }

    private generateEffectCard(id: number, rng: GameRng): GameCard {

        const effects: Array<GameEffect & { activation: CardEffectActivation }> = [];

        const effectCount = Math.floor(rng() * 3) + 1;
        for (let i = 0; i < effectCount; i++) {
            effects.push(this.generateCardEffect(rng));
        }

        return {
            id,
            kind: "effect",
            effectDetails: {
                effects
            }
        };
    }

    public generateCard(id: number): GameCard {
        const rng = GameRandoms.cardGenerator(id);

        const kind = rng() < 0.5 ? "spawn" : rng() < 0.5 ? "effect" : "nothing";

        if (kind === "spawn") {
            return this.generateSpawnCard(id, rng);
        } else if (kind === "effect") {
            return this.generateEffectCard(id, rng);
        } else {
            return {
                id,
                kind: "nothing"
            };
        }
    }

}