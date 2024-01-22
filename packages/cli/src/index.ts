import { GameCardGenerator, GameSimulator, formatCardDescription, formatGameMatch } from "@doggo/card-game";
import { program } from "commander";
import fs from "fs";

function main() {

    const prog = program;

    // const cardGenerator = new GameCardGenerator();

    // const generatedCards = [];
    // const numCards = 1000;

    // for (let i = 0; i < numCards; i++) {
    //     generatedCards.push(cardGenerator.generateCard(i));
    // }

    // for (let card of generatedCards) {
    //     console.log(`${card.id} >>> ${formatCardDescription(card)}`);
    // }

    // const gameSimulator = new GameSimulator();
    // const simulationResult = gameSimulator.simulateMatch(
    //     [0, 1, 2, 3, 4],
    //     [5, 6, 7, 8, 9],
    //     0
    // );

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

    prog.command("simulate <player1> <player2>")
        .option("--opt <key> <value>", "Set an option for the simulation.")
        .option("--seed <seed>", "Set the seed for the simulation.")
        .option("--output <outputFile>", "Set the output file for the simulation.")
        .description("Simulate a match between two players.")
        .action((player1, player2, options) => {
            // player1 and player2 are comma-separated lists of card ids
            const player1Cards = player1.split(",").map((id: string) => parseInt(id));
            const player2Cards = player2.split(",").map((id: string) => parseInt(id));

            const gameSimulator = new GameSimulator();
            const simulationResult = gameSimulator.simulateMatch(
                player1Cards,
                player2Cards,
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