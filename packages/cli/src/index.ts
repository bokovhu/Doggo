import { GameCardGenerator, GameSimulator, formatCardDescription, formatGameMatch, parsePlayerCommandList } from "@doggo/card-game";
import { program } from "commander";
import fs from "fs";
import { logError, logOut, logSuccess, logSystem, outMd } from "./logging";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";
import { useCommandCard } from "./commands/card.command";
import { useCommandCardTable } from "./commands/card-table.command";
import { useCommandSimulate } from "./commands/simulate.command";
import { useCommandMemberStatus } from "./commands/member-status";

async function main() {

    const prog = program;

    useCommandCard(prog);
    useCommandCardTable(prog);
    useCommandSimulate(prog);
    useCommandMemberStatus(prog);

    try {
        await prog.parseAsync(process.argv);
        logSuccess("Done.");
    } catch (e) {
        logError(e);
        throw e;
    }
}

main().then(
    () => process.exit(0),
).catch(
    (e) => process.exit(1),
)