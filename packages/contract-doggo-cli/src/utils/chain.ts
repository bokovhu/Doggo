import { IDoggoContract } from "@doggo/contract-doggo-api";
import { useDoggoFromSuri } from "@doggo/contract-doggo-client";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { ContractPromise } from "@polkadot/api-contract";

// Wrapper for actions that use the blockchain APIs

export async function chainAction(
    chainConsumer: (
        contract: IDoggoContract,
        user: any
    ) => Promise<any | void>,
    opts: {
        nodeUrl: string;
        suri: string;
        dev: boolean;
        prod: boolean;
    }
) {

    const env = opts.dev ? "dev" : opts.prod ? "prod" : "dev";
    const contract = await useDoggoFromSuri(
        env,
        opts.suri
    );

    await chainConsumer(contract, contract._user);
}