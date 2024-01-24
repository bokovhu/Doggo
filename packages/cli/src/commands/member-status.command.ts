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

                outMd("You are not a member yet. Please use the following command to become a member:");
                outMd("```\n$ doggo become-member\n```");

                return;

            }

            logSystem("Getting membership status from contract ...");
            memberStatus = await doggoContract.getMembershipStatus({
                accountId: doggoContract._user.address.toString()
            });

            if (`${memberStatus}` === "1") {
                outMd("You are a member!");
                outMd("You address is **" + doggoContract._user.address + "**");
            } else if (memberStatus === 0) {
                outMd("You are a **BANNED** member!");
            } else {
                outMd("You are **NOT** a member.");
            }

        });
}