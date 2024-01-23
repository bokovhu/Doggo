import { GameSimulator, formatGameMatch, parsePlayerCommandList } from "@doggo/card-game";
import { Command } from "commander";
import { logOut, logSystem, outMd } from "../logging";
import fs from "fs";

export function useCommandSimulate(
    prog: Command
) {
    prog.command("simulate <player1> <player2>")
        .option("--opt <key> <value>", "Set an option for the simulation.")
        .option("--seed <seed>", "Set the seed for the simulation.")
        .option("--output <outputFile>", "Set the output file for the simulation.")
        .option("--spit-out", "Spit out the simulation result to stdout.")
        .description("Simulate a match between two players.")
        .action((player1, player2, options) => {
            // player1 and player2 are comma-separated lists of card ids
            const player1Commands = parsePlayerCommandList(player1);
            const player2Commands = parsePlayerCommandList(player2);

            logSystem(`Simulating match ${options.seed} ...`);

            const gameSimulator = new GameSimulator();
            const simulationResult = gameSimulator.simulateMatch(
                player1Commands,
                player2Commands,
                options.seed
            );

            const formatted = formatGameMatch(simulationResult);

            if (options["spit-out"] || options.spitOut) {
                outMd(formatted);
            }

            if (options.output) {
                fs.writeFileSync(options.output, formatted);
                logOut(`Wrote simulation result to ${options.output}.`);
            }
        });
}