import {
    IDoggoContract,
    DoggoPolkadotJsContract
} from "@doggo/contract-doggo-api";
import {
    PROD_CONTRACT_ADDRESS,
    PROD_CONTRACT_NODE_URL,
    PROD_CONTRACT_ABI
} from "./deploy-params";
import {
    WsProvider,
    ApiPromise
} from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { BN, BN_ONE } from "@polkadot/util";

export async function useProdDoggoEnv(): Promise<{ api: ApiPromise, gasLimit: any, storageDepositLimit: any }> {

    const provider = new WsProvider(PROD_CONTRACT_NODE_URL);
    const api = await ApiPromise.create({ provider });
    await api.isReady;
    const gasLimit = api.registry.createType("WeightV2", {
        refTime: new BN("2000000000"),
        proofSize: new BN("200000"),
    });
    const storageDepositLimit = null;

    return {
        api,
        gasLimit,
        storageDepositLimit
    };

}

export async function useProdDoggoContract(
    user: any,
    env?: { api: ApiPromise, gasLimit: any, storageDepositLimit: any }
): Promise<IDoggoContract> {
    if(!env) {
        env = await useProdDoggoEnv();
    }
    const { api, gasLimit, storageDepositLimit } = env;
    const contract = new ContractPromise(api, PROD_CONTRACT_ABI, PROD_CONTRACT_ADDRESS);
    const polkadotJsContract = new DoggoPolkadotJsContract(
        contract,
        user,
        PROD_CONTRACT_ADDRESS,
        gasLimit,
        storageDepositLimit
    );
    return polkadotJsContract;
}