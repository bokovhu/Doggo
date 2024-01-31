import { Command } from "commander";
import { GameCardGenerator, formatCardDescription } from "@doggo/card-game";
import { LOG_OPTIONS, outResult } from "../utils/logging";

export function useCardCli(
    program: Command
): void {

    program.command("card")
        .option("--card-id <cardId>", "Card ID")
        .action(
            async (options) => {
                const parentOptions = program.opts();
                LOG_OPTIONS.plain = parentOptions.plain;
                LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
                LOG_OPTIONS.resultJson = parentOptions.resultJson;
                const cardGenerator = new GameCardGenerator();
                const card = cardGenerator.generateCard(options.cardId);
                const cardHashBase64 = btoa(
                    JSON.stringify({
                        cardId: card.id,
                    })
                );
                outResult(`MD`, formatCardDescription(card), "URL", `http://127.0.0.1:4001#${cardHashBase64}`);

            }
        );

}