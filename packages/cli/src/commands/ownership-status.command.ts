import { useDoggoFromSuri } from "@doggo/contract-doggo-client";
import { Command } from "commander";
import { logSystem, outMd } from "../logging";
import { IDoggoContract } from "@doggo/contract-doggo-api";

export function useCommandOwnershipStatus(
    prog: Command
) {
    prog.command("ownership-status")
        .option("-s, --suri <suri>", "The SURI of the user.", "//Alice")
        .option("-e, --env <env>", "The environment to use.", "dev")
        .description("Checks if the user is the owner of the game contract")
        .action(async (options) => {

            let doggoContract: (IDoggoContract & { _user: any }) | undefined = undefined;

            doggoContract = await useDoggoFromSuri(
                options.env as any,
                options.suri,
            );

            logSystem("Checking contract ownership ...");

            const ownerAccountId = await doggoContract.getOwner({});

            if (ownerAccountId === doggoContract._user.address.toString()) {
                outMd("You are the owner of the game contract!");
            } else {
                outMd("You are **NOT** the owner of the game contract.");
            }

        });
}