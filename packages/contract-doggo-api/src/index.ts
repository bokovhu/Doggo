import {
    ContractPromise
} from '@polkadot/api-contract';

export interface HelloWorldOpts {
}

export type HelloWorldReturn = number
export interface HelloWorldErrorOpts {
}

export type HelloWorldErrorReturn = number
export interface GetOwnerOpts {
}

export type GetOwnerReturn = string
export interface ClaimOwnershipOpts {
}

export type ClaimOwnershipReturn = void
export interface GetCardMintingPriceOpts {
}

export type GetCardMintingPriceReturn = number
export interface SetCardMintingPriceOpts {
    /**
     * The price of minting a card
     */
    cardMintingPrice: number;

}

export type SetCardMintingPriceReturn = void
export interface GetMembershipPriceOpts {
}

export type GetMembershipPriceReturn = number
export interface SetMembershipPriceOpts {
    /**
     * The price of membership
     */
    membershipPrice: number;

}

export type SetMembershipPriceReturn = void
export interface MintCardOpts {
}

export type MintCardReturn = void
export interface GetCardOwnerOpts {
    /**
     * The ID of the card
     */
    cardId: number;

}

export type GetCardOwnerReturn = string
export interface GetCardsOfOwnerOpts {
    /**
     * The account ID
     */
    accountId: string;

}

export type GetCardsOfOwnerReturn = number[]
export interface TransferCardOpts {
    /**
     * The ID of the card
     */
    cardId: number;

    /**
     * The account ID of the new owner of the card
     */
    newOwnerAccountId: string;

}

export type TransferCardReturn = void
export interface GetMembershipStatusOpts {
    /**
     * The account ID
     */
    accountId: string;

}

export type GetMembershipStatusReturn = number
export interface BecomeMemberOpts {
}

export type BecomeMemberReturn = void
export interface BanMemberOpts {
    /**
     * The account ID of the member to ban
     */
    accountId: string;

}

export type BanMemberReturn = void
export interface UnbanMemberOpts {
    /**
     * The account ID of the member to unban
     */
    accountId: string;

}

export type UnbanMemberReturn = void
export interface ChallengeOpts {
    /**
     * The account ID of the opponent
     */
    opponentAccountId: string;

    /**
     * The IDs of the offered cards (must be owned by the sender)
     */
    offeredCards: number[];

    /**
     * The IDs of the wanted cards (must be owned by the opponent)
     */
    wantedCards: number[];

    /**
     * The amount of pot tokens wanted by the opponent
     */
    wantedPotTokens: number;

}

export type ChallengeReturn = void
export interface AcceptChallengeOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type AcceptChallengeReturn = void
export interface SubmitChallengerCardsOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

    /**
     * The IDs of the cards to submit
     */
    cards: number[];

}

export type SubmitChallengerCardsReturn = void
export interface SubmitOpponentCardsOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

    /**
     * The IDs of the cards to submit
     */
    cards: number[];

}

export type SubmitOpponentCardsReturn = void
export interface RecordGameWinnerOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

    /**
     * The account ID of the winner
     */
    winnerAccountId: string;

}

export type RecordGameWinnerReturn = void
export interface GetChallengeStatusOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeStatusReturn = number
export interface GetChallengeSubmissionTimestampOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeSubmissionTimestampReturn = number
export interface GetChallengeAcceptDeadlineTimestampOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeAcceptDeadlineTimestampReturn = number
export interface GetChallengeChallengerAccountIdOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeChallengerAccountIdReturn = string
export interface GetChallengeOpponentAccountIdOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeOpponentAccountIdReturn = string
export interface GetChallengeBetPotTokensOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeBetPotTokensReturn = number
export interface GetChallengeWantedPotTokensOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeWantedPotTokensReturn = number
export interface GetChallengeOfferedCardsOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeOfferedCardsReturn = number[]
export interface GetChallengeWantedCardsOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeWantedCardsReturn = number[]
export interface GetChallengeChallengerCardsOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeChallengerCardsReturn = number[]
export interface GetChallengeOpponentCardsOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeOpponentCardsReturn = number[]
export interface GetChallengeWinnerAccountIdOpts {
    /**
     * The ID of the challenge
     */
    challengeId: number;

}

export type GetChallengeWinnerAccountIdReturn = string
export interface GetChallengesOfMemberAsChallengerOpts {
    /**
     * The account ID of the member
     */
    accountId: string;

}

export type GetChallengesOfMemberAsChallengerReturn = number[]
export interface GetChallengesOfMemberAsOpponentOpts {
    /**
     * The account ID of the member
     */
    accountId: string;

}

export type GetChallengesOfMemberAsOpponentReturn = number[]
export interface GetCardsOfCallerOpts {
}

export type GetCardsOfCallerReturn = number[]
export interface GetChallengesOfCallerAsChallengerOpts {
}

export type GetChallengesOfCallerAsChallengerReturn = number[]
export interface GetChallengesOfCallerAsOpponentOpts {
}

export type GetChallengesOfCallerAsOpponentReturn = number[]

export interface IDoggoContract {


    helloWorld (
        opts: HelloWorldOpts
    ): Promise<HelloWorldReturn>;


    helloWorldError (
        opts: HelloWorldErrorOpts
    ): Promise<HelloWorldErrorReturn>;


    getOwner (
        opts: GetOwnerOpts
    ): Promise<GetOwnerReturn>;


    claimOwnership (
        opts: ClaimOwnershipOpts
    ): Promise<ClaimOwnershipReturn>;


    getCardMintingPrice (
        opts: GetCardMintingPriceOpts
    ): Promise<GetCardMintingPriceReturn>;


    setCardMintingPrice (
        opts: SetCardMintingPriceOpts
    ): Promise<SetCardMintingPriceReturn>;


    getMembershipPrice (
        opts: GetMembershipPriceOpts
    ): Promise<GetMembershipPriceReturn>;


    setMembershipPrice (
        opts: SetMembershipPriceOpts
    ): Promise<SetMembershipPriceReturn>;


    mintCard (
        opts: MintCardOpts,
        value: number
    ): Promise<MintCardReturn>;


    getCardOwner (
        opts: GetCardOwnerOpts
    ): Promise<GetCardOwnerReturn>;


    getCardsOfOwner (
        opts: GetCardsOfOwnerOpts
    ): Promise<GetCardsOfOwnerReturn>;


    transferCard (
        opts: TransferCardOpts
    ): Promise<TransferCardReturn>;


    getMembershipStatus (
        opts: GetMembershipStatusOpts
    ): Promise<GetMembershipStatusReturn>;


    becomeMember (
        opts: BecomeMemberOpts,
        value: number
    ): Promise<BecomeMemberReturn>;


    banMember (
        opts: BanMemberOpts
    ): Promise<BanMemberReturn>;


    unbanMember (
        opts: UnbanMemberOpts
    ): Promise<UnbanMemberReturn>;


    challenge (
        opts: ChallengeOpts,
        value: number
    ): Promise<ChallengeReturn>;


    acceptChallenge (
        opts: AcceptChallengeOpts,
        value: number
    ): Promise<AcceptChallengeReturn>;


    submitChallengerCards (
        opts: SubmitChallengerCardsOpts
    ): Promise<SubmitChallengerCardsReturn>;


    submitOpponentCards (
        opts: SubmitOpponentCardsOpts
    ): Promise<SubmitOpponentCardsReturn>;


    recordGameWinner (
        opts: RecordGameWinnerOpts
    ): Promise<RecordGameWinnerReturn>;


    getChallengeStatus (
        opts: GetChallengeStatusOpts
    ): Promise<GetChallengeStatusReturn>;


    getChallengeSubmissionTimestamp (
        opts: GetChallengeSubmissionTimestampOpts
    ): Promise<GetChallengeSubmissionTimestampReturn>;


    getChallengeAcceptDeadlineTimestamp (
        opts: GetChallengeAcceptDeadlineTimestampOpts
    ): Promise<GetChallengeAcceptDeadlineTimestampReturn>;


    getChallengeChallengerAccountId (
        opts: GetChallengeChallengerAccountIdOpts
    ): Promise<GetChallengeChallengerAccountIdReturn>;


    getChallengeOpponentAccountId (
        opts: GetChallengeOpponentAccountIdOpts
    ): Promise<GetChallengeOpponentAccountIdReturn>;


    getChallengeBetPotTokens (
        opts: GetChallengeBetPotTokensOpts
    ): Promise<GetChallengeBetPotTokensReturn>;


    getChallengeWantedPotTokens (
        opts: GetChallengeWantedPotTokensOpts
    ): Promise<GetChallengeWantedPotTokensReturn>;


    getChallengeOfferedCards (
        opts: GetChallengeOfferedCardsOpts
    ): Promise<GetChallengeOfferedCardsReturn>;


    getChallengeWantedCards (
        opts: GetChallengeWantedCardsOpts
    ): Promise<GetChallengeWantedCardsReturn>;


    getChallengeChallengerCards (
        opts: GetChallengeChallengerCardsOpts
    ): Promise<GetChallengeChallengerCardsReturn>;


    getChallengeOpponentCards (
        opts: GetChallengeOpponentCardsOpts
    ): Promise<GetChallengeOpponentCardsReturn>;


    getChallengeWinnerAccountId (
        opts: GetChallengeWinnerAccountIdOpts
    ): Promise<GetChallengeWinnerAccountIdReturn>;


    getChallengesOfMemberAsChallenger (
        opts: GetChallengesOfMemberAsChallengerOpts
    ): Promise<GetChallengesOfMemberAsChallengerReturn>;


    getChallengesOfMemberAsOpponent (
        opts: GetChallengesOfMemberAsOpponentOpts
    ): Promise<GetChallengesOfMemberAsOpponentReturn>;


    getCardsOfCaller (
        opts: GetCardsOfCallerOpts
    ): Promise<GetCardsOfCallerReturn>;


    getChallengesOfCallerAsChallenger (
        opts: GetChallengesOfCallerAsChallengerOpts
    ): Promise<GetChallengesOfCallerAsChallengerReturn>;


    getChallengesOfCallerAsOpponent (
        opts: GetChallengesOfCallerAsOpponentOpts
    ): Promise<GetChallengesOfCallerAsOpponentReturn>;


}

export class DoggoPolkadotJsContract implements IDoggoContract {

    constructor(
        private _contract: ContractPromise,
        private _user: any,
        private _contractAddress: string,
        private _gasLimit: any,
        private _storageDepositLimit: any
    ) {

    }

    private get _userAddress() {
        return this._user.address;
    }

    async helloWorld(
        opts: HelloWorldOpts
    ): Promise<HelloWorldReturn> {
        const result = await this._contract.query.helloWorld(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            }        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] hello_world jsonResult: ${err}`);
        }

        return actualResult as HelloWorldReturn;
    }
    async helloWorldError(
        opts: HelloWorldErrorOpts
    ): Promise<HelloWorldErrorReturn> {
        const result = await this._contract.query.helloWorldError(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            }        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] hello_world_error jsonResult: ${err}`);
        }

        return actualResult as HelloWorldErrorReturn;
    }
    async getOwner(
        opts: GetOwnerOpts
    ): Promise<GetOwnerReturn> {
        const result = await this._contract.query.getOwner(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            }        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_owner jsonResult: ${err}`);
        }

        return actualResult as GetOwnerReturn;
    }
    async claimOwnership(
        opts: ClaimOwnershipOpts
    ): Promise<void> {

        const dryRunResult = await this._contract.query.claimOwnership(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,

            }        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] claim_ownership dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] claim_ownership dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.claimOwnership(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit
                    }                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] claim_ownership dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN claim_ownership dispatchError: ${dispatchError}`);
            }
        }

    }
    async getCardMintingPrice(
        opts: GetCardMintingPriceOpts
    ): Promise<GetCardMintingPriceReturn> {
        const result = await this._contract.query.getCardMintingPrice(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            }        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_card_minting_price jsonResult: ${err}`);
        }

        return actualResult as GetCardMintingPriceReturn;
    }
    async setCardMintingPrice(
        opts: SetCardMintingPriceOpts
    ): Promise<void> {

        const dryRunResult = await this._contract.query.setCardMintingPrice(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,

            },
            opts.cardMintingPrice
        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] set_card_minting_price dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] set_card_minting_price dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.setCardMintingPrice(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit
                    },
                    opts.cardMintingPrice
                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] set_card_minting_price dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN set_card_minting_price dispatchError: ${dispatchError}`);
            }
        }

    }
    async getMembershipPrice(
        opts: GetMembershipPriceOpts
    ): Promise<GetMembershipPriceReturn> {
        const result = await this._contract.query.getMembershipPrice(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            }        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_membership_price jsonResult: ${err}`);
        }

        return actualResult as GetMembershipPriceReturn;
    }
    async setMembershipPrice(
        opts: SetMembershipPriceOpts
    ): Promise<void> {

        const dryRunResult = await this._contract.query.setMembershipPrice(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,

            },
            opts.membershipPrice
        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] set_membership_price dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] set_membership_price dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.setMembershipPrice(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit
                    },
                    opts.membershipPrice
                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] set_membership_price dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN set_membership_price dispatchError: ${dispatchError}`);
            }
        }

    }
    async mintCard(
        opts: MintCardOpts,
        value: number
    ): Promise<void> {

        const dryRunResult = await this._contract.query.mintCard(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
                value: `${value}`
            }        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] mint_card dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] mint_card dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.mintCard(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit,
                        value: `${value}`
                    }                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] mint_card dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN mint_card dispatchError: ${dispatchError}`);
            }
        }

    }
    async getCardOwner(
        opts: GetCardOwnerOpts
    ): Promise<GetCardOwnerReturn> {
        const result = await this._contract.query.getCardOwner(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.cardId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_card_owner jsonResult: ${err}`);
        }

        return actualResult as GetCardOwnerReturn;
    }
    async getCardsOfOwner(
        opts: GetCardsOfOwnerOpts
    ): Promise<GetCardsOfOwnerReturn> {
        const result = await this._contract.query.getCardsOfOwner(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.accountId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_cards_of_owner jsonResult: ${err}`);
        }

        return actualResult as GetCardsOfOwnerReturn;
    }
    async transferCard(
        opts: TransferCardOpts
    ): Promise<void> {

        const dryRunResult = await this._contract.query.transferCard(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,

            },
            opts.cardId,
            opts.newOwnerAccountId
        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] transfer_card dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] transfer_card dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.transferCard(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit
                    },
                    opts.cardId,
                    opts.newOwnerAccountId
                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] transfer_card dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN transfer_card dispatchError: ${dispatchError}`);
            }
        }

    }
    async getMembershipStatus(
        opts: GetMembershipStatusOpts
    ): Promise<GetMembershipStatusReturn> {
        const result = await this._contract.query.getMembershipStatus(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.accountId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_membership_status jsonResult: ${err}`);
        }

        return actualResult as GetMembershipStatusReturn;
    }
    async becomeMember(
        opts: BecomeMemberOpts,
        value: number
    ): Promise<void> {

        const dryRunResult = await this._contract.query.becomeMember(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
                value: `${value}`
            }        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] become_member dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] become_member dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.becomeMember(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit,
                        value: `${value}`
                    }                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] become_member dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN become_member dispatchError: ${dispatchError}`);
            }
        }

    }
    async banMember(
        opts: BanMemberOpts
    ): Promise<void> {

        const dryRunResult = await this._contract.query.banMember(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,

            },
            opts.accountId
        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] ban_member dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] ban_member dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.banMember(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit
                    },
                    opts.accountId
                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] ban_member dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN ban_member dispatchError: ${dispatchError}`);
            }
        }

    }
    async unbanMember(
        opts: UnbanMemberOpts
    ): Promise<void> {

        const dryRunResult = await this._contract.query.unbanMember(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,

            },
            opts.accountId
        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] unban_member dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] unban_member dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.unbanMember(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit
                    },
                    opts.accountId
                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] unban_member dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN unban_member dispatchError: ${dispatchError}`);
            }
        }

    }
    async challenge(
        opts: ChallengeOpts,
        value: number
    ): Promise<void> {

        const dryRunResult = await this._contract.query.challenge(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
                value: `${value}`
            },
            opts.opponentAccountId,
            opts.offeredCards,
            opts.wantedCards,
            opts.wantedPotTokens
        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] challenge dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] challenge dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.challenge(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit,
                        value: `${value}`
                    },
                    opts.opponentAccountId,
                    opts.offeredCards,
                    opts.wantedCards,
                    opts.wantedPotTokens
                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] challenge dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN challenge dispatchError: ${dispatchError}`);
            }
        }

    }
    async acceptChallenge(
        opts: AcceptChallengeOpts,
        value: number
    ): Promise<void> {

        const dryRunResult = await this._contract.query.acceptChallenge(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
                value: `${value}`
            },
            opts.challengeId
        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] accept_challenge dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] accept_challenge dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.acceptChallenge(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit,
                        value: `${value}`
                    },
                    opts.challengeId
                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] accept_challenge dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN accept_challenge dispatchError: ${dispatchError}`);
            }
        }

    }
    async submitChallengerCards(
        opts: SubmitChallengerCardsOpts
    ): Promise<void> {

        const dryRunResult = await this._contract.query.submitChallengerCards(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,

            },
            opts.challengeId,
            opts.cards
        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] submit_challenger_cards dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] submit_challenger_cards dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.submitChallengerCards(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit
                    },
                    opts.challengeId,
                    opts.cards
                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] submit_challenger_cards dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN submit_challenger_cards dispatchError: ${dispatchError}`);
            }
        }

    }
    async submitOpponentCards(
        opts: SubmitOpponentCardsOpts
    ): Promise<void> {

        const dryRunResult = await this._contract.query.submitOpponentCards(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,

            },
            opts.challengeId,
            opts.cards
        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] submit_opponent_cards dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] submit_opponent_cards dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.submitOpponentCards(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit
                    },
                    opts.challengeId,
                    opts.cards
                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] submit_opponent_cards dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN submit_opponent_cards dispatchError: ${dispatchError}`);
            }
        }

    }
    async recordGameWinner(
        opts: RecordGameWinnerOpts
    ): Promise<void> {

        const dryRunResult = await this._contract.query.recordGameWinner(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,

            },
            opts.challengeId,
            opts.winnerAccountId
        );

        let dryRunJsonResult = dryRunResult.output?.toJSON() as any;

        if(dryRunJsonResult === null || dryRunJsonResult === undefined) {
            dryRunJsonResult = { ok: {} };
        }

        if("ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] record_game_winner dryRunJsonResult: ${err}`);
        }
        if(dryRunJsonResult && "ok" in dryRunJsonResult) {
            dryRunJsonResult = dryRunJsonResult.ok;
        }

        if(dryRunJsonResult && "err" in dryRunJsonResult) {
            const err = dryRunJsonResult.err;
            throw new Error(`[DoggoPolkadotJsContract] record_game_winner dryRunJsonResult: ${err}`);
        }

        const result = await new Promise<any>(
            async (resolve, reject) => {
                await this._contract.tx.recordGameWinner(
                    {
                        gasLimit: this._gasLimit,
                        storageDepositLimit: this._storageDepositLimit
                    },
                    opts.challengeId,
                    opts.winnerAccountId
                ).signAndSend(
                    this._user,
                    (res: any) => {
                        if(res.status.isInBlock) {
                            resolve(res);
                        }
                    }
                );
            }
        );

        const jsonResult = JSON.parse(JSON.stringify(result));
        const dispatchError = jsonResult.dispatchError;

        if(dispatchError) {
            if(dispatchError.module) {
                throw new Error(`[DoggoPolkadotJsContract] record_game_winner dispatchError: ${dispatchError.module.index} pallet, ${dispatchError.module.error} error`);
            } else {
                throw new Error(`[DoggoPolkadotJsContract] UNKNOWN record_game_winner dispatchError: ${dispatchError}`);
            }
        }

    }
    async getChallengeStatus(
        opts: GetChallengeStatusOpts
    ): Promise<GetChallengeStatusReturn> {
        const result = await this._contract.query.getChallengeStatus(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_status jsonResult: ${err}`);
        }

        return actualResult as GetChallengeStatusReturn;
    }
    async getChallengeSubmissionTimestamp(
        opts: GetChallengeSubmissionTimestampOpts
    ): Promise<GetChallengeSubmissionTimestampReturn> {
        const result = await this._contract.query.getChallengeSubmissionTimestamp(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_submission_timestamp jsonResult: ${err}`);
        }

        return actualResult as GetChallengeSubmissionTimestampReturn;
    }
    async getChallengeAcceptDeadlineTimestamp(
        opts: GetChallengeAcceptDeadlineTimestampOpts
    ): Promise<GetChallengeAcceptDeadlineTimestampReturn> {
        const result = await this._contract.query.getChallengeAcceptDeadlineTimestamp(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_accept_deadline_timestamp jsonResult: ${err}`);
        }

        return actualResult as GetChallengeAcceptDeadlineTimestampReturn;
    }
    async getChallengeChallengerAccountId(
        opts: GetChallengeChallengerAccountIdOpts
    ): Promise<GetChallengeChallengerAccountIdReturn> {
        const result = await this._contract.query.getChallengeChallengerAccountId(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_challenger_account_id jsonResult: ${err}`);
        }

        return actualResult as GetChallengeChallengerAccountIdReturn;
    }
    async getChallengeOpponentAccountId(
        opts: GetChallengeOpponentAccountIdOpts
    ): Promise<GetChallengeOpponentAccountIdReturn> {
        const result = await this._contract.query.getChallengeOpponentAccountId(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_opponent_account_id jsonResult: ${err}`);
        }

        return actualResult as GetChallengeOpponentAccountIdReturn;
    }
    async getChallengeBetPotTokens(
        opts: GetChallengeBetPotTokensOpts
    ): Promise<GetChallengeBetPotTokensReturn> {
        const result = await this._contract.query.getChallengeBetPotTokens(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_bet_pot_tokens jsonResult: ${err}`);
        }

        return actualResult as GetChallengeBetPotTokensReturn;
    }
    async getChallengeWantedPotTokens(
        opts: GetChallengeWantedPotTokensOpts
    ): Promise<GetChallengeWantedPotTokensReturn> {
        const result = await this._contract.query.getChallengeWantedPotTokens(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_wanted_pot_tokens jsonResult: ${err}`);
        }

        return actualResult as GetChallengeWantedPotTokensReturn;
    }
    async getChallengeOfferedCards(
        opts: GetChallengeOfferedCardsOpts
    ): Promise<GetChallengeOfferedCardsReturn> {
        const result = await this._contract.query.getChallengeOfferedCards(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_offered_cards jsonResult: ${err}`);
        }

        return actualResult as GetChallengeOfferedCardsReturn;
    }
    async getChallengeWantedCards(
        opts: GetChallengeWantedCardsOpts
    ): Promise<GetChallengeWantedCardsReturn> {
        const result = await this._contract.query.getChallengeWantedCards(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_wanted_cards jsonResult: ${err}`);
        }

        return actualResult as GetChallengeWantedCardsReturn;
    }
    async getChallengeChallengerCards(
        opts: GetChallengeChallengerCardsOpts
    ): Promise<GetChallengeChallengerCardsReturn> {
        const result = await this._contract.query.getChallengeChallengerCards(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_challenger_cards jsonResult: ${err}`);
        }

        return actualResult as GetChallengeChallengerCardsReturn;
    }
    async getChallengeOpponentCards(
        opts: GetChallengeOpponentCardsOpts
    ): Promise<GetChallengeOpponentCardsReturn> {
        const result = await this._contract.query.getChallengeOpponentCards(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_opponent_cards jsonResult: ${err}`);
        }

        return actualResult as GetChallengeOpponentCardsReturn;
    }
    async getChallengeWinnerAccountId(
        opts: GetChallengeWinnerAccountIdOpts
    ): Promise<GetChallengeWinnerAccountIdReturn> {
        const result = await this._contract.query.getChallengeWinnerAccountId(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.challengeId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenge_winner_account_id jsonResult: ${err}`);
        }

        return actualResult as GetChallengeWinnerAccountIdReturn;
    }
    async getChallengesOfMemberAsChallenger(
        opts: GetChallengesOfMemberAsChallengerOpts
    ): Promise<GetChallengesOfMemberAsChallengerReturn> {
        const result = await this._contract.query.getChallengesOfMemberAsChallenger(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.accountId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenges_of_member_as_challenger jsonResult: ${err}`);
        }

        return actualResult as GetChallengesOfMemberAsChallengerReturn;
    }
    async getChallengesOfMemberAsOpponent(
        opts: GetChallengesOfMemberAsOpponentOpts
    ): Promise<GetChallengesOfMemberAsOpponentReturn> {
        const result = await this._contract.query.getChallengesOfMemberAsOpponent(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            },
            opts.accountId
        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenges_of_member_as_opponent jsonResult: ${err}`);
        }

        return actualResult as GetChallengesOfMemberAsOpponentReturn;
    }
    async getCardsOfCaller(
        opts: GetCardsOfCallerOpts
    ): Promise<GetCardsOfCallerReturn> {
        const result = await this._contract.query.getCardsOfCaller(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            }        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_cards_of_caller jsonResult: ${err}`);
        }

        return actualResult as GetCardsOfCallerReturn;
    }
    async getChallengesOfCallerAsChallenger(
        opts: GetChallengesOfCallerAsChallengerOpts
    ): Promise<GetChallengesOfCallerAsChallengerReturn> {
        const result = await this._contract.query.getChallengesOfCallerAsChallenger(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            }        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenges_of_caller_as_challenger jsonResult: ${err}`);
        }

        return actualResult as GetChallengesOfCallerAsChallengerReturn;
    }
    async getChallengesOfCallerAsOpponent(
        opts: GetChallengesOfCallerAsOpponentOpts
    ): Promise<GetChallengesOfCallerAsOpponentReturn> {
        const result = await this._contract.query.getChallengesOfCallerAsOpponent(
            this._user.address,
            {
                gasLimit: this._gasLimit,
                storageDepositLimit: this._storageDepositLimit,
            }        );

        const jsonResult = result.output!.toJSON() as any;

        const actualResult = ("ok" in jsonResult && "ok" in jsonResult.ok)
            ? jsonResult.ok.ok
            : ("ok" in jsonResult)
                ? jsonResult.ok
                : jsonResult;
        
        if(typeof actualResult === "object" && "err" in actualResult) {
            const err = actualResult.err;
            throw new Error(`[DoggoPolkadotJsContract] get_challenges_of_caller_as_opponent jsonResult: ${err}`);
        }

        return actualResult as GetChallengesOfCallerAsOpponentReturn;
    }

}