import { GameCardGenerator, GameSimulator, formatCardDescription, formatGameMatch, parsePlayerCommandList } from "@doggo/card-game";
import { program } from "commander";
import fs from "fs";
import { logError, logOut, logSuccess, logSystem, outMd } from "./logging";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";
import { useCommandCard } from "./commands/card.command";
import { useCommandCardTable } from "./commands/card-table.command";
import { useCommandSimulate } from "./commands/simulate.command";

function main() {

    const prog = program;

    useCommandCard(prog);
    useCommandCardTable(prog);
    useCommandSimulate(prog);

    try {
        prog.parse(process.argv);
        logSuccess("Done.");
    } catch (e) {
        logError(e);
    }
}

main();