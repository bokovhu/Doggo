import { GameCardGenerator, GameSimulator, formatCardDescription, formatGameMatch, parsePlayerCommandList } from "@doggo/card-game";
import { program } from "commander";
import fs from "fs";
import { logError, logOut, logSuccess, logSystem, outMd } from "./logging";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";
import { useCommandCard } from "./commands/card.command";
import { useCommandCardTable } from "./commands/card-table.command";
import { useCommandSimulate } from "./commands/simulate.command";
import { useCommandMemberStatus } from "./commands/member-status.command";
import { useCommandClaimOwnership } from "./commands/claim-ownership.command";
import { useCommandOwnershipStatus } from "./commands/ownership-status.command";
import { useCommandBecomeMember } from "./commands/become-member.command";
import { useCommandSetMembershipPrice } from "./commands/set-membership-price.command";
import { useCommandSetMintPrice } from "./commands/set-mint-price.command";

async function main() {

    const prog = program;

    useCommandCard(prog);
    useCommandCardTable(prog);
    useCommandSimulate(prog);
    useCommandMemberStatus(prog);
    useCommandClaimOwnership(prog);
    useCommandOwnershipStatus(prog);
    useCommandBecomeMember(prog);
    useCommandSetMembershipPrice(prog);
    useCommandSetMintPrice(prog);

    try {
        await prog.parseAsync(process.argv);
        logSuccess("Done.");
    } catch (e) {
        logError(e);
        throw e;
    }
}

main().then(
    () => process.exit(0),
).catch(
    (e) => process.exit(1),
)