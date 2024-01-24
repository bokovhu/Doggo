import { useDoggoFromSuri } from "@doggo/contract-doggo-client";
import { Command } from "commander";
import { logSystem, outMd } from "../logging";
import { IDoggoContract } from "@doggo/contract-doggo-api";

export function useCommandSetMintPrice(
    prog: Command
) {
    prog.command("set-mint-price <newPrice>")
        .option("-s, --suri <suri>", "The SURI of the user.", "//Alice")
        .option("-e, --env <env>", "The environment to use.", "dev")
        .description("Claims ownership of the game contract")
        .action(async (newPrice, options) => {

            let doggoContract: (IDoggoContract & { _user: any }) | undefined = undefined;

            doggoContract = await useDoggoFromSuri(
                options.env as any,
                options.suri,
            );

            logSystem("Setting mint price to " + newPrice + " ...");

            await doggoContract.setCardMintingPrice({
                cardMintingPrice: parseInt(`${newPrice}`)
            });

        });
}