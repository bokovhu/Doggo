import { Command } from "commander";
import { LOG_OPTIONS, outResult } from "../utils/logging";
import { chainAction } from "../utils/chain";

export function useMeCli(
    program: Command
): void {

    program.command("me")
        .action(
            async (options) => {
                const parentOptions = program.opts();
                LOG_OPTIONS.plain = parentOptions.plain;
                LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
                LOG_OPTIONS.resultJson = parentOptions.resultJson;
                await chainAction(
                    async (contract, user) => {
                        const memberHashBase64 = btoa(
                            JSON.stringify({
                                accountId: user.address,
                            })
                        )
                        outResult(`URL`, `http://127.0.0.1:4002#${memberHashBase64}`);
                    },
                    {
                        nodeUrl: parentOptions.nodeUrl,
                        suri: parentOptions.suri,
                        dev: parentOptions.dev,
                        prod: parentOptions.prod,
                    }
                );
            }
        );

}