import { Command } from "commander";

export function useBattleCli(
    program: Command
): void {

    program.command("battle")
        .option("--challenge-id <challengeId>", "Challenge ID")
        .action(
            async (options) => {
                console.log("Battle", options);
            }
        );

}