import { GameCardGenerator, GameSimulator, formatCardDescription, formatGameMatch, parsePlayerCommandList } from "@doggo/card-game";
import { program } from "commander";
import fs from "fs";

function main() {

    const prog = program;

    prog.command("card <id>")
        .description("Generate a card with the given id.")
        .action((id) => {
            const idInt = parseInt(id);
            if (isNaN(idInt)) {
                console.error("Invalid id.");
                return;
            }
            if (idInt < 0) {
                console.error("Id must be positive or 0.");
                return;
            }
            const cardGenerator = new GameCardGenerator();
            const card = cardGenerator.generateCard(idInt);
            console.log(`${idInt}: ${formatCardDescription(card)}`);
        });

    prog.command("card-table <from> <to>")
        .option("--output <outputFile>", "Set the output file for the table.")
        .description("Generate a table of cards between the given ids.")
        .action((from, to, options) => {
            const fromInt = parseInt(from);
            const toInt = parseInt(to);
            if (isNaN(fromInt)) {
                console.error("Invalid from.");
                return;
            }
            if (isNaN(toInt)) {
                console.error("Invalid to.");
                return;
            }
            if (fromInt < 0) {
                console.error("From must be positive or 0.");
                return;
            }
            if (toInt < 0) {
                console.error("To must be positive or 0.");
                return;
            }
            if (fromInt > toInt) {
                console.error("From must be smaller or equal to to.");
                return;
            }
            if (toInt - fromInt > 999999999) {
                console.error("Too many cards.");
                return;
            }
            const cardGenerator = new GameCardGenerator();
            let result = "";
            result += "| Id | Rarity |  Description |\n";
            result += "|----|--------|--------------|\n";
            for (let i = fromInt; i <= toInt; i++) {
                const card = cardGenerator.generateCard(i);
                result += `| ${i} | ${card.rarity} | ${formatCardDescription(card)} |\n`;
            }

            console.log(result);
            if (options.output) {
                fs.writeFileSync(options.output, result);
                console.log(`Wrote card table to ${options.output}.`);
            }

        });

    prog.command("simulate <player1> <player2>")
        .option("--opt <key> <value>", "Set an option for the simulation.")
        .option("--seed <seed>", "Set the seed for the simulation.")
        .option("--output <outputFile>", "Set the output file for the simulation.")
        .description("Simulate a match between two players.")
        .action((player1, player2, options) => {
            // player1 and player2 are comma-separated lists of card ids
            const player1Commands = parsePlayerCommandList(player1);
            const player2Commands = parsePlayerCommandList(player2);

            const gameSimulator = new GameSimulator();
            const simulationResult = gameSimulator.simulateMatch(
                player1Commands,
                player2Commands,
                options.seed
            );

            const formatted = formatGameMatch(simulationResult);
            console.log(formatted);

            if (options.output) {
                fs.writeFileSync(options.output, formatted);
                console.log(`Wrote simulation result to ${options.output}.`);
            }
        });

    prog.parse(process.argv);
}

main();