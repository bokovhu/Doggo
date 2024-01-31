import {
    IDoggoContract,
} from "@doggo/contract-doggo-api";
import {
    useDevDoggoContract,
    useDevDoggoEnv,
} from '@doggo/contract-doggo-dev';
import {
    useProdDoggoContract,
    useProdDoggoEnv,
} from '@doggo/contract-doggo-prod';
import {
    Keyring,
} from "@polkadot/keyring";
import {
    ApiPromise,
} from "@polkadot/api";

export type DoggoContractEnv = "dev" | "prod";

async function useEnv(
    env: DoggoContractEnv,
): Promise<{api: ApiPromise, gasLimit: any, storageDepositLimit: any}> {
    if(env === "dev") {
        return await useDevDoggoEnv();
    } else if(env === "prod") {
        return await useProdDoggoEnv();
    } else {
        throw new Error("Invalid env");
    }
}

export async function useDoggoFromUser(
    env: DoggoContractEnv,
    user: any,
    usedEnv?: {api: ApiPromise, gasLimit: any, storageDepositLimit: any}
): Promise<IDoggoContract> {
    if(env === "dev") {
        return await useDevDoggoContract(user, usedEnv);
    } else if(env === "prod") {
        return await useProdDoggoContract(user, usedEnv);
    } else {
        throw new Error("Invalid env");
    }
}

export async function useDoggoFromSuri(
    env: DoggoContractEnv,
    suri: string
): Promise<IDoggoContract & { _user: any }> {
    const usedEnv = await useEnv(env);
    const keyring = new Keyring({ type: "sr25519" });
    const pair = keyring.addFromUri(suri, { name: "user" });
    const doggoContract = await useDoggoFromUser(env, pair, usedEnv);
    Object.defineProperty(doggoContract, "_user", {
        value: pair,
        writable: false,
    });
    return doggoContract as any;
}