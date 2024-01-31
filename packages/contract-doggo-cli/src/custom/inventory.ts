import { Command } from "commander";

export function useInventoryCli(
    program: Command
): void {

    program.command("inventory")
        .option("--account-id <accountId>", "The account ID")
        .action(
            async (options) => {
                console.log("Inventory", options);
            }
        );

}