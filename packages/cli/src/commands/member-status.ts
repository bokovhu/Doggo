import { useDoggoFromSuri } from "@doggo/contract-doggo-client";
import { Command } from "commander";
import { logOut, logSystem, outMd } from "../logging";
import fs from "fs";
import path from "path";
import os from "os";
import { IDoggoContract } from "@doggo/contract-doggo-api";

export function useCommandMemberStatus(
    prog: Command
) {
    prog.command("member-status")
        .option("-s, --suri <suri>", "The SURI of the user.", "//Alice")
        .option("-e, --env <env>", "The environment to use.", "dev")
        .option("--force-suri", "Force the SURI to be used, even if a membership.json file exists.", false)
        .description("Get the member status of the user.")
        .action(async (options) => {

            let doggoContract: (IDoggoContract & { _user: any }) | undefined = undefined;
            let memberStatus: number | undefined = undefined;

            // Check $USERHOME/.doggo/membership.json
            const membershipPath = path.join(os.homedir(), ".doggo", "membership.json");
            logSystem("Checking membership status in $USERHOME/.doggo/membership.json (" + membershipPath + ") ...");

            if (fs.existsSync(membershipPath) && !options.forceSuri) {

                logSystem("Found membership.json, using SURI from there.");
                const membershipInfo: {
                    suri: string;
                    env: string;
                } = JSON.parse(fs.readFileSync(membershipPath).toString("utf-8"));

                doggoContract = await useDoggoFromSuri(membershipInfo.env as any, membershipInfo.suri);

            } else {

                if (!options.suri) {
                    throw new Error("No SURI supplied, and no membership.json found.");
                }

                logSystem("Loading contract for env " + options.env + " ...")

                // Check contract with supplied SURI
                doggoContract = await useDoggoFromSuri(options.env, options.suri);

                logSystem("Loaded contract for env " + options.env + "!");

                // Save membership.json

                logSystem("Saving membership.json ...");

                fs.mkdirSync(path.join(os.homedir(), ".doggo"), { recursive: true });
                fs.writeFileSync(membershipPath, JSON.stringify({
                    suri: options.suri,
                    env: options.env,
                }));

                logSystem("Saved membership.json to " + membershipPath + "!");

            }

            logSystem("Getting membership status from contract ...");
            memberStatus = await doggoContract.getMembershipStatus({
                accountId: doggoContract._user.address.toString()
            });

            if (memberStatus === 1) {
                outMd("You are a member!");
                outMd("You address is **" + doggoContract._user.address + "**");
            } else if (memberStatus === 0) {
                outMd("You are a **BANNED** member!");
            } else {
                outMd("You are not a member.");
            }

        });
}