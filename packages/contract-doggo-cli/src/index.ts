import chalk from "chalk";
import { program } from "commander";
import {
    useBattleCli
} from "./custom/battle";
import {
    useCardCli
} from "./custom/card";
import {
    useInventoryCli
} from "./custom/inventory";
import {
    useMeCli
} from "./custom/me";
import {
    LOG_OPTIONS,
    outError,
    outInfo,
    outResult,
    outSuccess,
    outWarning,
} from "./utils/logging";
import {
    parseEmptyType,
    parseToSingleNumber,
    parseToSingleString,
    parseToNumberList,
    parseUnsupportedType,
    validateRequired,
    validateNumberMin,
    validateNumberMax,
    validateStringLengthMin,
    validateStringLengthMax,
} from "./utils/options";

import {
    reportCard,
    reportCards,
    reportChallenge,
    reportChallenges,
    reportAny,
    reportMember,
    reportMembershipStatus,
    reportChallengeStatus,
    reportTimestamp
} from "./utils/report";

import {
    chainAction
} from "./utils/chain";

// CLI entrypoint method

async function main() {
    
    program.option("-u, --node-url <nodeUrl>", "sets the deploy node URL", "ws://127.0.0.1:9944")
        .option("--dev", "use the dev environment", true)
        .option("--prod", "use the prod environment", false)
        .option("-s, --suri <deployerSuri>", "SURI of the account to call the contract as", "//Alice")
        .option("--plain", "plain output, no emojis", false)
        .option("--result-only", "only output the result, and nothing else", false)
        .option("--result-json", "output the result as JSON", false);
    
    program.command("hello-world")
        .description("Returns 42, used for testing client-side of the Smart Contract")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling hello_world`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.helloWorld(
                        {
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`hello_world result:`, result);

                    reportAny(result);
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("hello-world-error")
        .description("Returns an error, used for testing client-side of the Smart Contract")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling hello_world_error`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.helloWorldError(
                        {
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`hello_world_error result:`, result);

                    reportAny(result);
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-owner")
        .description("Returns the account ID of the owner of this smart contract")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_owner`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getOwner(
                        {
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_owner result:`, result);

                    reportAny(result);
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("claim-ownership")
        .description("Claims the ownership of this smart contract, only callable if there is no owner yet (by anyone)")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling claim_ownership`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.claimOwnership(
                        {
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`claim_ownership result:`, result);

                    reportAny(true);
                    outSuccess("claim_ownership completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-card-minting-price")
        .description("Returns the price of minting a card")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_card_minting_price`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getCardMintingPrice(
                        {
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_card_minting_price result:`, result);

                    reportAny(result);
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("set-card-minting-price")
        .option(
            "--card-minting-price <cardMintingPrice>", // Option name
            "The price of minting a card", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Sets the price of minting a card, only callable by the owner")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling set_card_minting_price`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.setCardMintingPrice(
                        {
                            cardMintingPrice: options.cardMintingPrice as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`set_card_minting_price result:`, result);

                    reportAny(true);
                    outSuccess("set_card_minting_price completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-membership-price")
        .description("Returns the price of membership")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_membership_price`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getMembershipPrice(
                        {
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_membership_price result:`, result);

                    reportAny(result);
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("set-membership-price")
        .option(
            "--membership-price <membershipPrice>", // Option name
            "The price of membership", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Sets the price of membership, only callable by the owner")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling set_membership_price`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.setMembershipPrice(
                        {
                            membershipPrice: options.membershipPrice as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`set_membership_price result:`, result);

                    reportAny(true);
                    outSuccess("set_membership_price completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("mint-card")
        .option("--value <value>", "Value to send with the transaction", parseToSingleNumber)
        .description("Mints a card for the sender, only callable by members")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling mint_card`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.mintCard(
                        {
                        },
                        options.value as any,
                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`mint_card result:`, result);

                    reportAny(true);
                    outSuccess("mint_card completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-card-owner")
        .option(
            "--card-id <cardId>", // Option name
            "The ID of the card", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the owner of a card")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_card_owner`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getCardOwner(
                        {
                            cardId: options.cardId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_card_owner result:`, result);

                    reportMember(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-cards-of-owner")
        .option(
            "--account-id <accountId>", // Option name
            "The account ID", // Option description
            parseToSingleString // Option parser
        )
        .description("Returns the IDs of the cards of an account")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_cards_of_owner`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getCardsOfOwner(
                        {
                            accountId: options.accountId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_cards_of_owner result:`, result);

                    reportCards(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("transfer-card")
        .option(
            "--card-id <cardId>", // Option name
            "The ID of the card", // Option description
            parseToSingleNumber // Option parser
        )
        .option(
            "--new-owner-account-id <newOwnerAccountId>", // Option name
            "The account ID of the new owner of the card", // Option description
            parseToSingleString // Option parser
        )
        .description("Transfers a card to another account, only callable by the owner of the card")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling transfer_card`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.transferCard(
                        {
                            cardId: options.cardId as any,
                            newOwnerAccountId: options.newOwnerAccountId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`transfer_card result:`, result);

                    reportAny(true);
                    outSuccess("transfer_card completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-membership-status")
        .option(
            "--account-id <accountId>", // Option name
            "The account ID", // Option description
            parseToSingleString // Option parser
        )
        .description("Returns the membership status of an account")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_membership_status`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getMembershipStatus(
                        {
                            accountId: options.accountId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_membership_status result:`, result);

                    reportMembershipStatus(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("become-member")
        .option("--value <value>", "Value to send with the transaction", parseToSingleNumber)
        .description("Becomes a member, only callable by non-members")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling become_member`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.becomeMember(
                        {
                        },
                        options.value as any,
                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`become_member result:`, result);

                    reportAny(true);
                    outSuccess("become_member completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("ban-member")
        .option(
            "--account-id <accountId>", // Option name
            "The account ID of the member to ban", // Option description
            parseToSingleString // Option parser
        )
        .description("Bans a member, only callable by the owner")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling ban_member`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.banMember(
                        {
                            accountId: options.accountId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`ban_member result:`, result);

                    reportAny(true);
                    outSuccess("ban_member completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("unban-member")
        .option(
            "--account-id <accountId>", // Option name
            "The account ID of the member to unban", // Option description
            parseToSingleString // Option parser
        )
        .description("Unbans a member, only callable by the owner")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling unban_member`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.unbanMember(
                        {
                            accountId: options.accountId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`unban_member result:`, result);

                    reportAny(true);
                    outSuccess("unban_member completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("challenge")
        .option(
            "--opponent-account-id <opponentAccountId>", // Option name
            "The account ID of the opponent", // Option description
            parseToSingleString // Option parser
        )
        .option(
            "--offered-cards <offeredCards>", // Option name
            "The IDs of the offered cards (must be owned by the sender)", // Option description
            parseToNumberList // Option parser
        )
        .option(
            "--wanted-cards <wantedCards>", // Option name
            "The IDs of the wanted cards (must be owned by the opponent)", // Option description
            parseToNumberList // Option parser
        )
        .option(
            "--wanted-pot-tokens <wantedPotTokens>", // Option name
            "The amount of pot tokens wanted by the opponent", // Option description
            parseToSingleNumber // Option parser
        )
        .option("--value <value>", "Value to send with the transaction", parseToSingleNumber)
        .description("Challenges another account, only callable by members")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling challenge`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.challenge(
                        {
                            opponentAccountId: options.opponentAccountId as any,
                            offeredCards: options.offeredCards as any,
                            wantedCards: options.wantedCards as any,
                            wantedPotTokens: options.wantedPotTokens as any,
                        },
                        options.value as any,
                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`challenge result:`, result);

                    reportAny(true);
                    outSuccess("challenge completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("accept-challenge")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .option("--value <value>", "Value to send with the transaction", parseToSingleNumber)
        .description("Accepts a challenge, only callable by the opponent")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling accept_challenge`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.acceptChallenge(
                        {
                            challengeId: options.challengeId as any,
                        },
                        options.value as any,
                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`accept_challenge result:`, result);

                    reportChallenge(options.challengeId)
                    outSuccess("accept_challenge completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("submit-challenger-cards")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .option(
            "--cards <cards>", // Option name
            "The IDs of the cards to submit", // Option description
            parseToNumberList // Option parser
        )
        .description("Submits cards for a challenge, only callable by the challenger")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling submit_challenger_cards`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.submitChallengerCards(
                        {
                            challengeId: options.challengeId as any,
                            cards: options.cards as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`submit_challenger_cards result:`, result);

                    reportChallenge(options.challengeId)
                    outSuccess("submit_challenger_cards completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("submit-opponent-cards")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .option(
            "--cards <cards>", // Option name
            "The IDs of the cards to submit", // Option description
            parseToNumberList // Option parser
        )
        .description("Submits cards for a challenge, only callable by the opponent")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling submit_opponent_cards`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.submitOpponentCards(
                        {
                            challengeId: options.challengeId as any,
                            cards: options.cards as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`submit_opponent_cards result:`, result);

                    reportChallenge(options.challengeId)
                    outSuccess("submit_opponent_cards completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("record-game-winner")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .option(
            "--winner-account-id <winnerAccountId>", // Option name
            "The account ID of the winner", // Option description
            parseToSingleString // Option parser
        )
        .description("Records the winner of a game, only callable by the owner")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling record_game_winner`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.recordGameWinner(
                        {
                            challengeId: options.challengeId as any,
                            winnerAccountId: options.winnerAccountId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`record_game_winner result:`, result);

                    reportAny(true);
                    outSuccess("record_game_winner completed successfully.");
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-status")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the status of a challenge")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_status`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeStatus(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_status result:`, result);

                    reportChallengeStatus(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-submission-timestamp")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the timestamp of the last challenge submission")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_submission_timestamp`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeSubmissionTimestamp(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_submission_timestamp result:`, result);

                    reportTimestamp(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-accept-deadline-timestamp")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the timestamp of the challenge accept deadline")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_accept_deadline_timestamp`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeAcceptDeadlineTimestamp(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_accept_deadline_timestamp result:`, result);

                    reportTimestamp(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-challenger-account-id")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the account ID of the challenger of a challenge")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_challenger_account_id`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeChallengerAccountId(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_challenger_account_id result:`, result);

                    reportMember(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-opponent-account-id")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the account ID of the opponent of a challenge")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_opponent_account_id`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeOpponentAccountId(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_opponent_account_id result:`, result);

                    reportAny(result);
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-bet-pot-tokens")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the bet pot tokens of a challenge")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_bet_pot_tokens`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeBetPotTokens(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_bet_pot_tokens result:`, result);

                    reportAny(result);
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-wanted-pot-tokens")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the wanted pot tokens of a challenge")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_wanted_pot_tokens`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeWantedPotTokens(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_wanted_pot_tokens result:`, result);

                    reportAny(result);
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-offered-cards")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the offered cards of a challenge")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_offered_cards`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeOfferedCards(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_offered_cards result:`, result);

                    reportCards(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-wanted-cards")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the wanted cards of a challenge")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_wanted_cards`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeWantedCards(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_wanted_cards result:`, result);

                    reportCards(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-challenger-cards")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the challenger cards in battle of a challenge")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_challenger_cards`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeChallengerCards(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_challenger_cards result:`, result);

                    reportCards(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-opponent-cards")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the opponent cards in battle of a challenge")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_opponent_cards`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeOpponentCards(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_opponent_cards result:`, result);

                    reportCards(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenge-winner-account-id")
        .option(
            "--challenge-id <challengeId>", // Option name
            "The ID of the challenge", // Option description
            parseToSingleNumber // Option parser
        )
        .description("Returns the account ID of the winner of a challenge")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenge_winner_account_id`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengeWinnerAccountId(
                        {
                            challengeId: options.challengeId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenge_winner_account_id result:`, result);

                    reportMember(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenges-of-member-as-challenger")
        .option(
            "--account-id <accountId>", // Option name
            "The account ID of the member", // Option description
            parseToSingleString // Option parser
        )
        .description("Returns the IDs of the challenges of a member as the challenger")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenges_of_member_as_challenger`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengesOfMemberAsChallenger(
                        {
                            accountId: options.accountId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenges_of_member_as_challenger result:`, result);

                    reportChallenges(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenges-of-member-as-opponent")
        .option(
            "--account-id <accountId>", // Option name
            "The account ID of the member", // Option description
            parseToSingleString // Option parser
        )
        .description("Returns the IDs of the challenges of a member as the opponent")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenges_of_member_as_opponent`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengesOfMemberAsOpponent(
                        {
                            accountId: options.accountId as any,
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenges_of_member_as_opponent result:`, result);

                    reportChallenges(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-cards-of-caller")
        .description("Returns the IDs of the cards of the caller")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_cards_of_caller`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getCardsOfCaller(
                        {
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_cards_of_caller result:`, result);

                    reportCards(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenges-of-caller-as-challenger")
        .description("Returns the IDs of the challenges of the caller as the challenger")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenges_of_caller_as_challenger`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengesOfCallerAsChallenger(
                        {
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenges_of_caller_as_challenger result:`, result);

                    reportChallenges(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });
    program.command("get-challenges-of-caller-as-opponent")
        .description("Returns the IDs of the challenges of the caller as the opponent")
        .action(async (options, cmd) => {
            const parentOptions = program.opts();
            LOG_OPTIONS.plain = parentOptions.plain;
            LOG_OPTIONS.resultOnly = parentOptions.resultOnly || parentOptions.resultJson;
            LOG_OPTIONS.resultJson = parentOptions.resultJson;
            outInfo(`Calling get_challenges_of_caller_as_opponent`, options, parentOptions);
            await chainAction(
                async (contract, user) => {
                    const result = await contract.getChallengesOfCallerAsOpponent(
                        {
                        },

                    );
                    outInfo("You address is", user.address);
                    // outSuccess(`get_challenges_of_caller_as_opponent result:`, result);

                    reportChallenges(result)
                },
                {
                    nodeUrl: parentOptions.nodeUrl,
                    suri: parentOptions.suri,
                    dev: parentOptions.dev,
                    prod: parentOptions.prod,
                }
            );
        });

    useBattleCli(
        program
    );
    useCardCli(
        program
    );
    useInventoryCli(
        program
    );
    useMeCli(
        program
    );
    
    await program.parseAsync(process.argv);

}

// Invoke main as the side-effect of this module, handle finish and errors

main().then(
    () => {
        outSuccess(`✅ Finished successfully.`);
        process.exit(0);
    },
    (err) => {
        outError(`❌ Fatal error!`, err);
        process.exit(1);
    }
);