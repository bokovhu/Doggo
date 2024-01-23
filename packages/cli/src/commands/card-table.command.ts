import { Command } from "commander";
import { logError, logOut, logSystem, outMd } from "../logging";
import { GameCardGenerator, formatCardDescription } from "@doggo/card-game";
import fs from "fs";

export function useCommandCardTable(
    prog: Command
) {
    prog.command("card-table <from> <to>")
        .option("--output <outputFile>", "Set the output file for the table.")
        .option("--spit-out", "Spit out the simulation result to stdout.")
        .description("Generate a table of cards between the given ids.")
        .action((from, to, options) => {
            const fromInt = parseInt(from);
            const toInt = parseInt(to);
            if (isNaN(fromInt)) {
                logError("Invalid from.");
                return;
            }
            if (isNaN(toInt)) {
                logError("Invalid to.");
                return;
            }
            if (fromInt < 0) {
                logError("From must be positive or 0.");
                return;
            }
            if (toInt < 0) {
                logError("To must be positive or 0.");
                return;
            }
            if (fromInt > toInt) {
                logError("From must be smaller or equal to to.");
                return;
            }
            if (toInt - fromInt > 999999999) {
                logError("Too many cards.");
                return;
            }
            logSystem(`Generating card table from ${fromInt} to ${toInt} ...`);
            const cardGenerator = new GameCardGenerator();
            let result = "";
            result += "| Id | Rarity |  Description |\n";
            result += "|----|--------|--------------|\n";
            for (let i = fromInt; i <= toInt; i++) {
                const card = cardGenerator.generateCard(i);
                result += `| ${i} | ${card.rarity} | ${formatCardDescription(card)} |\n`;
            }

            if (options["spit-out"] || options.spitOut) {
                outMd(result);
            }

            if (options.output) {
                fs.writeFileSync(options.output, result);
                logOut(`Wrote card table to ${options.output}.`);
            }

        });
}