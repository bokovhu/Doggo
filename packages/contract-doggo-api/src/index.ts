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

        const humanResult = result.output!.toHuman() as any;

        // console.log('humanResult', humanResult);

        const actualResult = humanResult.Ok.Ok;

        // console.log('actualResult', actualResult);

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

        const humanResult = result.output!.toHuman() as any;

        // console.log('humanResult', humanResult);

        const actualResult = humanResult.Ok.Ok;

        // console.log('actualResult', actualResult);

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

        const humanResult = result.output!.toHuman() as any;

        // console.log('humanResult', humanResult);

        const actualResult = humanResult.Ok.Ok;

        // console.log('actualResult', actualResult);

        return actualResult as GetOwnerReturn;
    }
    async claimOwnership(
        opts: ClaimOwnershipOpts
    ): Promise<ClaimOwnershipReturn> {
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

        const humanResult = result.status.asInBlock.toHuman() as any;

        console.log('humanResult', humanResult);

        return null as any;
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

        const humanResult = result.output!.toHuman() as any;

        // console.log('humanResult', humanResult);

        const actualResult = humanResult.Ok.Ok;

        // console.log('actualResult', actualResult);

        return actualResult as GetCardMintingPriceReturn;
    }
    async setCardMintingPrice(
        opts: SetCardMintingPriceOpts
    ): Promise<SetCardMintingPriceReturn> {
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

        const humanResult = result.status.asInBlock.toHuman() as any;

        console.log('humanResult', humanResult);

        return null as any;
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

        const humanResult = result.output!.toHuman() as any;

        // console.log('humanResult', humanResult);

        const actualResult = humanResult.Ok.Ok;

        // console.log('actualResult', actualResult);

        return actualResult as GetMembershipPriceReturn;
    }
    async setMembershipPrice(
        opts: SetMembershipPriceOpts
    ): Promise<SetMembershipPriceReturn> {
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

        const humanResult = result.status.asInBlock.toHuman() as any;

        console.log('humanResult', humanResult);

        return null as any;
    }
    async mintCard(
        opts: MintCardOpts,
        value: number
    ): Promise<MintCardReturn> {
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

        const humanResult = result.status.asInBlock.toHuman() as any;

        console.log('humanResult', humanResult);

        return null as any;
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

        const humanResult = result.output!.toHuman() as any;

        // console.log('humanResult', humanResult);

        const actualResult = humanResult.Ok.Ok;

        // console.log('actualResult', actualResult);

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

        const humanResult = result.output!.toHuman() as any;

        // console.log('humanResult', humanResult);

        const actualResult = humanResult.Ok.Ok;

        // console.log('actualResult', actualResult);

        return actualResult as GetCardsOfOwnerReturn;
    }
    async transferCard(
        opts: TransferCardOpts
    ): Promise<TransferCardReturn> {
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

        const humanResult = result.status.asInBlock.toHuman() as any;

        console.log('humanResult', humanResult);

        return null as any;
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

        const humanResult = result.output!.toHuman() as any;

        // console.log('humanResult', humanResult);

        const actualResult = humanResult.Ok.Ok;

        // console.log('actualResult', actualResult);

        return actualResult as GetMembershipStatusReturn;
    }
    async becomeMember(
        opts: BecomeMemberOpts,
        value: number
    ): Promise<BecomeMemberReturn> {
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

        const humanResult = result.status.asInBlock.toHuman() as any;

        console.log('humanResult', humanResult);

        return null as any;
    }
    async banMember(
        opts: BanMemberOpts
    ): Promise<BanMemberReturn> {
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

        const humanResult = result.status.asInBlock.toHuman() as any;

        console.log('humanResult', humanResult);

        return null as any;
    }
    async unbanMember(
        opts: UnbanMemberOpts
    ): Promise<UnbanMemberReturn> {
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

        const humanResult = result.status.asInBlock.toHuman() as any;

        console.log('humanResult', humanResult);

        return null as any;
    }

}