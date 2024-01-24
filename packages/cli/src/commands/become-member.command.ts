import { useDoggoFromSuri } from "@doggo/contract-doggo-client";
import { Command } from "commander";
import { logSystem, outMd } from "../logging";
import { IDoggoContract } from "@doggo/contract-doggo-api";
import { BN } from "@polkadot/util";
import fs from "fs";
import path from "path";
import os from "os";

const ONE_UNIT = 100000000000;

export function useCommandBecomeMember(
    prog: Command
) {
    prog.command("become-member")
        .option("-s, --suri <suri>", "The SURI of the user.", "//Alice")
        .option("-e, --env <env>", "The environment to use.", "dev")
        .description("Claims ownership of the game contract")
        .action(async (options) => {

            let doggoContract: (IDoggoContract & { _user: any }) | undefined = undefined;

            doggoContract = await useDoggoFromSuri(
                options.env as any,
                options.suri,
            );

            logSystem("Fetching membership fee ...");

            let membershipFee = await doggoContract.getMembershipPrice({}) as any;
            if(typeof membershipFee === "string") {
                membershipFee = parseInt(membershipFee.replace(",", ""));
            }

            membershipFee = new BN(membershipFee).mul(new BN(ONE_UNIT)).toString();

            logSystem("Becoming a member for " + membershipFee + " ...");

            await doggoContract.becomeMember({}, membershipFee);

            const membershipInfo: {
                suri: string;
                env: string;
            } = {
                suri: options.suri,
                env: options.env,
            };

            const membershipPath = path.join(os.homedir(), ".doggo", "membership.json");
            logSystem("Writing membership.json ...");

            fs.mkdirSync(path.join(os.homedir(), ".doggo"), { recursive: true });
            fs.writeFileSync(membershipPath, JSON.stringify(membershipInfo, null, 4));

            logSystem("Checking membership status ...");
            const memberStatus = await doggoContract.getMembershipStatus({
                accountId: doggoContract._user.address.toString()
            });

            if (memberStatus === 1) {
                outMd("You are a member!");
            } else if (memberStatus === 0) {
                outMd("You are a **BANNED** member!");
            } else {
                outMd("You are **NOT** a member.");
            }

        });
}