import { EffectTrigger, EffectKind, EffectTarget, GameCard, GameEffect, GameEvent, GameEventKind, GameMatch, PlayerCommand, Unit } from "./model";

function formatCardArray(cards: Array<GameCard>) {
    return cards.map((card, index) => `* **${index + 1}** (\`${card.id}\`): ${formatCardDescription(card)}`).join("\n");
}

const triggerDescriptions: Record<EffectTrigger, (eff: GameEffect) => string> = {
    "on-spawn": eff => `When spawned`,
    "once": eff => `Once`,
    "any-own-plane-killed": eff => `When an own plane is killed`,
    "any-own-plane-of-kind-killed": eff => `When an own ${eff.triggerUnitKind} plane is killed`,
    "any-enemy-plane-killed": eff => `When an enemy plane is killed`,
    "any-enemy-plane-of-kind-killed": eff => `When an enemy ${eff.triggerUnitKind} plane is killed`,
    "any-plane-killed": eff => `When a plane is killed`,
    "any-plane-of-kind-killed": eff => `When a ${eff.triggerUnitKind} plane is killed`,
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
    "commit-commands": ev => `:::details Player ${ev.player} commits their commands\n${formatPlayerCommandArray(ev.data.commands)}\n:::`,
    "add-to-playing-deck": ev => `:::details Player ${ev.player} adds a card to the playing deck\n${formatCardDescription(ev.data.command.card)}\n:::`,
    "shuffle-playing-deck": ev => `**The playing deck is shuffled.**`,
    "play-card": ev => `:::::::details Player ${ev.player} plays a card\n${formatCardDescription(ev.data.card)}\n`,
    "spawn-n-units": ev => `:::details Player ${ev.player} spawns ${ev.data.units.length} units\n${formatUnitArray(ev.data.units)}\n:::`,
    // "spawn-unit": ev => `:::details Player ${ev.player} spawns a unit\n${formatUnitDescription(ev.data.unit)}\n:::`,
    "spawn-unit": ev => `\n`,
    "move-unit": ev => `:::details Player ${ev.player} moves a unit\n:::`,
    "target-unit": ev => `:::::details Player ${ev.player} targets a unit\n:::info _Attacker_\n${formatUnitDescription(ev.data.unit)}\n:::\n:::danger _Target_\n${formatUnitDescription(ev.data.target)}\n:::\n:::::`,
    "attack-unit": ev => `:::::details Player ${ev.player} attacks a unit\n:::info _Attacker_\n${formatUnitDescription(ev.data.unit)}\n:::\n:::danger _Target_\n${formatUnitDescription(ev.data.target)}\n:::\n:::info Damage\n_Damage Roll_: **${ev.data.damageRoll}**\n\n_Evasion Roll_: **${ev.data.evasionRoll}**\n\n_Damage Pool_ (_AP * Damage Roll_): **${ev.data.damagePool}**\n\n_Evasion Reduction_ (_MAN * Evasion Roll_): **${ev.data.evasionReduction}**\n\n_Target DP_: **${ev.data.target.dp}**\n\n_Applied Damage_: **${ev.data.appliedDamage}** (**${ev.data.hpBefore}** -> **${ev.data.hpAfter}**)\n:::\n:::::`,
    "kill-unit": ev => `:::details Player ${ev.player} kills a unit\n${formatUnitDescription(ev.data.unit)}\n:::`,
    "reinforce": ev => `:::details Player ${ev.player} reinforces their playing deck\n:::`,
    "change-hp": ev => `:::details Player ${ev.player} changes a unit's HP\nTarget: ${formatUnitDescription(ev.data.unit)}\n\nHP: ${ev.data.hpBefore} -> ${ev.data.hpAfter} (${ev.data.hpAfter - ev.data.hpBefore})\n\n:::`,
    "change-ap": ev => `:::details Player ${ev.player} changes a unit's AP\nTarget: ${formatUnitDescription(ev.data.unit)}\n\nAP: ${ev.data.apBefore} -> ${ev.data.apAfter} (${ev.data.apAfter - ev.data.apBefore})\n\n:::`,
    "change-dp": ev => `:::details Player ${ev.player} changes a unit's DP\nTarget: ${formatUnitDescription(ev.data.unit)}\n\nDP: ${ev.data.dpBefore} -> ${ev.data.dpAfter} (${ev.data.dpAfter - ev.data.dpBefore})\n\n:::`,
    "change-man": ev => `:::details Player ${ev.player} changes a unit's MAN\nTarget: ${formatUnitDescription(ev.data.unit)}\n\nMAN: ${ev.data.manBefore} -> ${ev.data.manAfter} (${ev.data.manAfter - ev.data.manBefore})\n\n:::`,
    "activate-effect": ev => `:::::details Player ${ev.player} activates an effect\nEffect: ${formatEffectDescription(ev.data.effect)}\n\nTargets:\n\n${formatUnitArray(ev.data.targets)}\n\n`,
    "end-effect-activate-consequences": ev => `:::::`,
    "win": ev => `**Player ${ev.player} wins the match${ev.data && ev.data.reason ? ` - ${ev.data.reason}` : ""}**`,
    "shuffle-units": ev => `**The units are shuffled.**`,
    "play-effect": ev => `:::details Player ${ev.player} plays an effect\n${formatEffectDescription(ev.data.effect)}\n:::`,
    "end-card-play": ev => `:::::::`
};

export function formatUnitDescription(unit: Unit) {
    return `A **${unit.kind}** with **${unit.hp} HP** | **${unit.ap} AP** | **${unit.dp} DP** | **${unit.man} MAN**${unit.target === -1 ? " (no target)" : ` (${unit.target})`}`;
}

export function formatUnitArray(units: Array<Unit>) {
    return units.map(u => `* **${u.id}**: ${formatUnitDescription(u)}`).join("\n");
}

export function formatEffectDescription(effect: GameEffect) {

    const triggerDescription = triggerDescriptions[effect.trigger](effect);
    const kindDescription = kindDescriptions[effect.kind](effect).toLowerCase()
        .replace(" ap ", " **AP** ")
        .replace(" dp ", " **DP** ")
        .replace(" man ", " **MAN** ")
        .replace(" hp ", " **HP** ");
    const targetDescription = targetDescriptions[effect.target](effect).toLowerCase();

    return `${triggerDescription}, ${kindDescription} to ${targetDescription}.`;
}

export function formatCardDescription(card: GameCard) {

    const rarity = `[${card.rarity}] `;

    if (card.kind === "spawn") {
        let result = `Spawns **${card.spawnDetails!.amount}** plane(s) of the **${card.spawnDetails!.kind}** kind`;

        if (card.spawnDetails!.effects.length > 0) {
            for (const effect of card.spawnDetails!.effects) {
                result += ` (${formatEffectDescription(effect)})`;
            }
        }

        return rarity + result;
    } else if (card.kind === "effect") {
        let result = ``;

        if (card.effectDetails!.effects.length > 0) {
            for (const effect of card.effectDetails!.effects) {
                result += ` ${formatEffectDescription(effect)}`;
            }
        }

        return rarity + result;
    } else {
        return rarity + "Does nothing";
    }

}

export function formatGameEvent(event: GameEvent) {
    // Events are formatted to _Markdown_, based on their kind.
    return eventKindDescription[event.kind](event);
}

export function formatGameMatch(match: GameMatch) {
    const formattedEvents = match.events.map(formatGameEvent).join("\n\n");
    const formattedWinner = match.winner === 0 ? `Tie` : `Winner: Player ${match.winner}`;
    return `# Match ${match.seed}\n\n${formattedWinner}\n\n${formattedEvents}`;
}

export function formatPlayerCommand(command: PlayerCommand) {
    return `Play card ${command.card.id} - ${formatCardDescription(command.card)}`;
}

export function formatPlayerCommandArray(commands: Array<PlayerCommand>) {
    return commands.map(
        (cmd, index) => `* **${index + 1}**: ${formatPlayerCommand(cmd)}`
    ).join("\n");
}
