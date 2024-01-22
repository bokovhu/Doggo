import { EffectActivation, EffectKind, EffectTarget, GameCard, GameEffect, GameEvent, GameEventKind, GameMatch, Unit } from "./model";

function formatCardArray(cards: Array<GameCard>) {
    return cards.map((card, index) => `* **${index + 1}** (\`${card.id}\`): ${formatCardDescription(card)}`).join("\n");
}

const activationDescriptions: Record<EffectActivation, (eff: GameEffect) => string> = {
    "every-turn": eff => `Every turn`,
    "on-killed": eff => `When killed`,
    "on-spawn": eff => `When spawned`,
    "on-target-killed": eff => `When killing a target`,
    "once": eff => `Once`,
    "any-own-plane-killed": eff => `When an own plane is killed`,
    "any-own-plane-of-kind-killed": eff => `When an own ${eff.activationKind} plane is killed`,
    "any-enemy-plane-killed": eff => `When an enemy plane is killed`,
    "any-enemy-plane-of-kind-killed": eff => `When an enemy ${eff.activationKind} plane is killed`,
    "any-plane-killed": eff => `When a plane is killed`,
    "any-plane-of-kind-killed": eff => `When a ${eff.activationKind} plane is killed`,
};
const kindDescriptions: Record<EffectKind, (eff: GameEffect) => string> = {
    "direct-damage": eff => `Deals ${eff.value} damage`,
    "direct-heal": eff => `Heals for ${eff.value}`,
    "affect-ap": eff => eff.value > 0 ? `Increases AP by ${eff.value}` : `Decreases AP by ${-eff.value}`,
    "affect-dp": eff => eff.value > 0 ? `Increases DP by ${eff.value}` : `Decreases DP by ${-eff.value}`,
    "affect-man": eff => eff.value > 0 ? `Increases MAN by ${eff.value}` : `Decreases MAN by ${-eff.value}`,
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
const eventKindDescription: Record<GameEventKind, (ev: GameEvent) => string> = {
    "begin-game": ev => `# The game begins`,
    "begin-turn": ev => `## Turn ${ev.turn} begins`,
    "commit-commands": ev => `:::details Player ${ev.player} commits their commands\n${formatCardArray(ev.data.cards)}\n:::`,
    "add-to-playing-deck": ev => `:::details Player ${ev.player} adds a card to the playing deck\n${formatCardDescription(ev.data.card)}\n:::`,
    "shuffle-playing-deck": ev => `**The playing deck is shuffled.**`,
    "play-card": ev => `:::details Player ${ev.player} plays a card\n${formatCardDescription(ev.data.card)}\n:::`,
    "spawn-unit": ev => `:::details Player ${ev.player} spawns a unit\n${formatUnitDescription(ev.data.unit)}\n:::`,
    "move-unit": ev => `:::details Player ${ev.player} moves a unit\n:::`,
    "target-unit": ev => `:::details Player ${ev.player} targets a unit\n:::`,
    "attack-unit": ev => `:::details Player ${ev.player} attacks a unit\n:::`,
    "kill-unit": ev => `:::details Player ${ev.player} kills a unit\n:::`,
    "reinforce": ev => `:::details Player ${ev.player} reinforces their playing deck\n:::`,
    "change-hp": ev => `:::details Player ${ev.player} changes a unit's HP\n:::`,
    "change-ap": ev => `:::details Player ${ev.player} changes a unit's AP\n:::`,
    "change-dp": ev => `:::details Player ${ev.player} changes a unit's DP\n:::`,
    "change-man": ev => `:::details Player ${ev.player} changes a unit's MAN\n:::`,
    "activate-effect": ev => `:::details Player ${ev.player} activates an effect\n${formatEffectDescription(ev.data.effect)}\n:::`,
    "win": ev => `**Player ${ev.player} wins the match${ev.data && ev.data.reason ? ` - ${ev.data.reason}` : ""}**`
};

export function formatUnitDescription(unit: Unit) {
    return `A ${unit.kind} at \`(${unit.position[0]}, ${unit.position[1]})\` with **${unit.hp} HP** | **${unit.ap} AP** | **${unit.dp} DP** | **${unit.man} MAN**${unit.target === -1 ? " (no target)" : ` (${unit.target})`}`;
}

export function formatEffectDescription(effect: GameEffect) {

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

export function formatGameEvent(event: GameEvent) {
    // Events are formatted to _Markdown_, based on their kind.
    return eventKindDescription[event.kind](event);
}

export function formatGameMatch(match: GameMatch) {
    const formattedEvents = match.events.map(formatGameEvent).join("\n\n");
    return `# Match ${match.seed}\n\nWinner: Player ${match.winner}\n\n${formattedEvents}`;
}
