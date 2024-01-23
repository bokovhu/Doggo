import { Command } from "commander";
import { logError, logSystem, outMd } from "../logging";
import { GameCardGenerator, formatCardDescription } from "@doggo/card-game";

export function useCommandCard(
    prog: Command
) {
    prog.command("card <id>")
        .description("Generate a card with the given id.")
        .action((id) => {
            const idInt = parseInt(id);
            if (isNaN(idInt)) {
                logError("Invalid id.");
                return;
            }
            if (idInt < 0) {
                logError("Id must be positive or 0.");
                return;
            }
            logSystem(`Generating card ${idInt} ...`);
            const cardGenerator = new GameCardGenerator();
            const card = cardGenerator.generateCard(idInt);
            outMd(`${idInt}: ${formatCardDescription(card)}`);
        });
}