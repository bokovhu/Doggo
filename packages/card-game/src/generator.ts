import { GameRandoms, GameRng } from "@doggo/game-random";
import { UnitKind, CardEffectActivation, EffectKind, EffectTarget, GameCard, GameEffect, PlaneEffectActivation } from "./model";

const planeEffectActivations: PlaneEffectActivation[] = ["on-spawn", "on-killed", "on-target-killed", "every-turn"];
const planeEffectTargets: EffectTarget[] = [
    "this-plane", "all-own-planes", "all-own-planes-of-kind", "some-own-planes", "some-own-planes-of-kind",
    "all-enemy-planes", "all-enemy-planes-of-kind", "some-enemy-planes", "some-enemy-planes-of-kind",
    "all-planes", "all-planes-of-kind", "some-planes", "some-planes-of-kind"
];
const cardEffectActivations: CardEffectActivation[] = [
    "once", "every-turn", "any-own-plane-killed", "any-enemy-plane-killed", "any-plane-killed",
    "any-own-plane-of-kind-killed", "any-enemy-plane-of-kind-killed", "any-plane-of-kind-killed"
];
const cardEffectTargets: EffectTarget[] = [
    "all-own-planes", "all-enemy-planes", "all-planes",
    "all-own-planes-of-kind", "all-enemy-planes-of-kind", "all-planes-of-kind",
    "some-own-planes", "some-enemy-planes", "some-planes",
    "some-own-planes-of-kind", "some-enemy-planes-of-kind", "some-planes-of-kind"
];
const airplaneKinds: UnitKind[] = ["fighter", "supply", "heal"];
const effectKinds: EffectKind[] = ["direct-damage", "direct-heal", "affect-ap", "affect-dp", "affect-man"];

/**
 * A generator for game cards. Always generates the same card, given the same id.
 */
export class GameCardGenerator {

    constructor() {

    }

    private generatePlaneEffect(rng: GameRng): GameEffect & { activation: PlaneEffectActivation } {

        const activation = planeEffectActivations[Math.floor(rng() * planeEffectActivations.length)];
        const target = planeEffectTargets[Math.floor(rng() * planeEffectTargets.length)];

        const shouldHaveTargetKind = target.includes("-of-kind");
        const targetKind = shouldHaveTargetKind ? airplaneKinds[Math.floor(rng() * airplaneKinds.length)] : undefined;

        const shouldHaveActivationKind = activation.includes("-of-kind");
        const activationKind = shouldHaveActivationKind ? airplaneKinds[Math.floor(rng() * airplaneKinds.length)] : undefined;

        const shouldHaveTargetCount = target.includes("some-");
        const targetCount = shouldHaveTargetCount ? Math.floor(rng() * 3) + 1 : undefined;

        const kind = effectKinds[Math.floor(rng() * effectKinds.length)];
        const value = Math.floor(rng() * 1000) + 1;

        return { activation, target, targetKind, targetCount, kind, value, activationKind };
    }


    private generateCardEffect(rng: GameRng): GameEffect & { activation: CardEffectActivation } {

        const activation = cardEffectActivations[Math.floor(rng() * cardEffectActivations.length)];
        const target = cardEffectTargets[Math.floor(rng() * cardEffectTargets.length)];

        const shouldHaveTargetKind = target.includes("-of-kind");
        const targetKind = shouldHaveTargetKind ? airplaneKinds[Math.floor(rng() * airplaneKinds.length)] : undefined;

        const shouldHaveActivationKind = activation.includes("-of-kind");
        const activationKind = shouldHaveActivationKind ? airplaneKinds[Math.floor(rng() * airplaneKinds.length)] : undefined;

        const shouldHaveTargetCount = target.includes("some-");
        const targetCount = shouldHaveTargetCount ? Math.floor(rng() * 3) + 1 : undefined;

        const kind = effectKinds[Math.floor(rng() * effectKinds.length)];
        const value = Math.floor(rng() * 1000) + 1;

        return { activation, target, targetKind, targetCount, kind, value, activationKind };
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
