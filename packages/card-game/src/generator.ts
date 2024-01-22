import { GameRandoms, GameRng } from "@doggo/game-random";
import { UnitKind, CardEffectActivation, EffectKind, EffectTarget, GameCard, GameEffect, PlaneEffectActivation, GameCardRarity } from "./model";

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
const unitKinds: UnitKind[] = ["fighter", "bomber", "helicopter"];
const effectKinds: EffectKind[] = ["direct-damage", "direct-heal", "affect-ap", "affect-dp", "affect-man"];


interface CardRarity {
    name: string;

    multipliers: {
        targetCount: number;
        directDamage: number;
        directHeal: number;
        affectAp: number;
        affectDp: number;
        affectMan: number;
        unitHealth: number;
        unitAttack: number;
        unitManouverability: number;
        unitSpawn: number;
    };

    weight: number;

    numEffects: number;
}

const baseEffectValues = {
    directDamage: 5,
    directHeal: 5,
    affectAp: 1,
    affectDp: 1,
    affectMan: 1
};
const cardRarities: CardRarity[] = [
    {
        name: "common", weight: 1, multipliers: {
            targetCount: 1,
            directDamage: 1, directHeal: 1,
            affectAp: 1, affectDp: 1, affectMan: 1,
            unitAttack: 1, unitHealth: 1, unitManouverability: 1, unitSpawn: 1
        },
        numEffects: 1
    },
    {
        name: "rare", weight: 10, multipliers: {
            targetCount: 2,
            directDamage: 2, directHeal: 2,
            affectAp: 2, affectDp: 2, affectMan: 2,
            unitAttack: 2, unitHealth: 2, unitManouverability: 2, unitSpawn: 2
        },
        numEffects: 3
    },
    {
        name: "legendary", weight: 1000, multipliers: {
            targetCount: 5,
            directDamage: 5, directHeal: 5,
            affectAp: 5, affectDp: 5, affectMan: 5,
            unitAttack: 5, unitHealth: 5, unitManouverability: 5, unitSpawn: 5
        },
        numEffects: 7
    }
];
cardRarities.sort((a, b) => a.weight - b.weight);

const unitKindBaseValues: Record<UnitKind, { hp: number, ap: number, dp: number, man: number, spawn: number }> = {
    fighter: {
        hp: 100,
        ap: 9,
        dp: 1,
        man: 10,
        spawn: 7
    },
    helicopter: {
        hp: 300,
        ap: 14,
        dp: 3,
        man: 1,
        spawn: 2
    },
    bomber: {
        hp: 150,
        ap: 5,
        dp: 10,
        man: 5,
        spawn: 5
    }
};
const baseTargetCount = 10;

const raritySum = cardRarities.reduce((acc, cur) => acc + cur.weight, 0);
const raritySteps: Record<CardRarity["name"], number> = {};
let _lastRarityStep = 0;
for (const rarity of cardRarities) {
    _lastRarityStep += rarity.weight;
    raritySteps[rarity.name] = _lastRarityStep;
}

/**
 * A generator for game cards. Always generates the same card, given the same id.
 */
export class GameCardGenerator {

    constructor() {

    }

    private generatePlaneEffect(rarity: CardRarity, rng: GameRng): GameEffect & { activation: PlaneEffectActivation } {

        const activation = planeEffectActivations[Math.floor(rng() * planeEffectActivations.length)];
        const target = planeEffectTargets[Math.floor(rng() * planeEffectTargets.length)];

        const shouldHaveTargetKind = target.includes("-of-kind");
        const targetKind = shouldHaveTargetKind ? unitKinds[Math.floor(rng() * unitKinds.length)] : undefined;

        const shouldHaveActivationKind = activation.includes("-of-kind");
        const activationKind = shouldHaveActivationKind ? unitKinds[Math.floor(rng() * unitKinds.length)] : undefined;

        const shouldHaveTargetCount = target.includes("some-");
        const targetCount = shouldHaveTargetCount ? Math.floor(rng() * baseTargetCount * rarity.multipliers.targetCount) + 1 : undefined;

        const kind = effectKinds[Math.floor(rng() * effectKinds.length)];
        let value = 0;

        switch (kind) {
            case "direct-damage": value = Math.floor(rng() * baseEffectValues.directDamage * rarity.multipliers.directDamage) + 1; break;
            case "direct-heal": value = Math.floor(rng() * baseEffectValues.directHeal * rarity.multipliers.directHeal) + 1; break;
            case "affect-ap": value = Math.floor(rng() * baseEffectValues.affectAp * rarity.multipliers.affectAp) + 1; break;
            case "affect-dp": value = Math.floor(rng() * baseEffectValues.affectDp * rarity.multipliers.affectDp) + 1; break;
            case "affect-man": value = Math.floor(rng() * baseEffectValues.affectMan * rarity.multipliers.affectMan) + 1; break;
            default: throw new Error(`Unknown effect kind: ${kind}`);
        }

        return { activation, target, targetKind, targetCount, kind, value, activationKind };
    }


    private generateCardEffect(rarity: CardRarity, rng: GameRng): GameEffect & { activation: CardEffectActivation } {

        const activation = cardEffectActivations[Math.floor(rng() * cardEffectActivations.length)];
        const target = cardEffectTargets[Math.floor(rng() * cardEffectTargets.length)];

        const shouldHaveTargetKind = target.includes("-of-kind");
        const targetKind = shouldHaveTargetKind ? unitKinds[Math.floor(rng() * unitKinds.length)] : undefined;

        const shouldHaveActivationKind = activation.includes("-of-kind");
        const activationKind = shouldHaveActivationKind ? unitKinds[Math.floor(rng() * unitKinds.length)] : undefined;

        const shouldHaveTargetCount = target.includes("some-");
        const targetCount = shouldHaveTargetCount ? Math.floor(rng() * baseTargetCount * rarity.multipliers.targetCount) + 1 : undefined;

        const kind = effectKinds[Math.floor(rng() * effectKinds.length)];
        let value = 0;

        switch (kind) {
            case "direct-damage": value = Math.floor(rng() * baseEffectValues.directDamage * rarity.multipliers.directDamage) + 1; break;
            case "direct-heal": value = Math.floor(rng() * baseEffectValues.directHeal * rarity.multipliers.directHeal) + 1; break;
            case "affect-ap": value = Math.floor(rng() * baseEffectValues.affectAp * rarity.multipliers.affectAp) + 1; break;
            case "affect-dp": value = Math.floor(rng() * baseEffectValues.affectDp * rarity.multipliers.affectDp) + 1; break;
            case "affect-man": value = Math.floor(rng() * baseEffectValues.affectMan * rarity.multipliers.affectMan) + 1; break;
        }

        return { activation, target, targetKind, targetCount, kind, value, activationKind };
    }


    private generateSpawnCard(id: number, rarity: CardRarity, rng: GameRng): GameCard {

        const kind = unitKinds[Math.floor(rng() * unitKinds.length)];

        const baseAttributes = {
            hp: unitKindBaseValues[kind].hp * rarity.multipliers.unitHealth,
            ap: unitKindBaseValues[kind].ap * rarity.multipliers.unitAttack,
            dp: unitKindBaseValues[kind].dp * rarity.multipliers.unitManouverability,
            man: unitKindBaseValues[kind].man * rarity.multipliers.unitManouverability,
            spawn: unitKindBaseValues[kind].spawn * rarity.multipliers.unitSpawn
        };

        const generatedAttributes = {
            hp: baseAttributes.hp + Math.floor(rng() * baseAttributes.hp),
            ap: baseAttributes.ap + Math.floor(rng() * baseAttributes.ap),
            dp: baseAttributes.dp + Math.floor(rng() * baseAttributes.dp),
            man: baseAttributes.man + Math.floor(rng() * baseAttributes.man)
        };

        const amount = baseAttributes.spawn + Math.floor(rng() * baseAttributes.spawn);

        const effects: Array<GameEffect & { activation: PlaneEffectActivation }> = [];

        const effectCount = Math.floor((rarity.numEffects + 1) * rng());
        for (let i = 0; i < effectCount; i++) {
            effects.push(this.generatePlaneEffect(rarity, rng));
        }

        return {
            id,
            rarity: rarity.name as GameCardRarity,
            kind: "spawn",
            spawnDetails: {
                kind,
                amount,
                attributes: generatedAttributes,
                effects
            }
        };
    }

    private generateEffectCard(id: number, rarity: CardRarity, rng: GameRng): GameCard {

        const effects: Array<GameEffect & { activation: CardEffectActivation }> = [];

        const effectCount = 1 + Math.floor(rarity.numEffects * rng());
        for (let i = 0; i < effectCount; i++) {
            effects.push(this.generateCardEffect(rarity, rng));
        }

        return {
            id,
            rarity: rarity.name as GameCardRarity,
            kind: "effect",
            effectDetails: {
                effects
            }
        };
    }

    public generateCard(id: number): GameCard {
        const rng = GameRandoms.cardGenerator(id);

        const cardKinds = ["spawn", "effect", "nothing"];
        const kind = cardKinds[Math.floor(rng() * cardKinds.length)];
        const rarityRoll = rng() * raritySum;
        let rarity = cardRarities[0];
        for (const rarityCandidate of cardRarities) {
            if (rarityRoll <= raritySteps[rarityCandidate.name]) {
                rarity = rarityCandidate;
                break;
            }
        }

        if (kind === "spawn") {
            return this.generateSpawnCard(id, rarity, rng);
        } else if (kind === "effect") {
            return this.generateEffectCard(id, rarity, rng);
        } else {
            return {
                id,
                rarity: rarity.name as GameCardRarity,
                kind: "nothing"
            };
        }
    }

}
