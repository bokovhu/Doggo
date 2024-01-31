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
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import {
    ApiPromise,
} from "@polkadot/api";
import {
    useState,
} from "react";


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

async function promptSelection<T>(
    choices: Array<T>,
    labelFn?: (item: T) => string,
    opts?: {
        title?: string,
        message?: string,
        valueFn?: (item: T) => any
    }
): Promise<{ account: T, env: "dev" | "prod" }> {
    let {
        title,
        message,
        valueFn
    } = opts || {};

    if (!title) {
        title = "Select an option";
    }

    if (!message) {
        message = "Please select one of the options below, and click the button to confirm your selection!";
    }

    if (!valueFn) {
        valueFn = item => item;
    }

    if (!labelFn) {
        labelFn = item => `${item}`;
    }

    const selectionKey = `web3selection:doggo`;
    const localStorageValue = localStorage.getItem(selectionKey);

    if(localStorageValue !== null) {
        return JSON.parse(localStorageValue);
    }

    const valuePromise = new Promise((resolve, reject) => {
        // Create a new window
        const selectionWindow = window.open('', '_blank', 'width=640,height=480');

        if (!selectionWindow) {
            return reject('Failed to open a new window');
        }

        // Add HTML content to the new window
        const htmlContent = "<h1>" + title + "</h1><p><i>" + message + "</i></p>"
            + "<p><select id=\"envSelect\"></select></p>"
            + "<p><select id=\"choiceSelect\"></select></p>"
            + "<p><button id=\"confirmButton\">Confirm</button></p>";
        const htmlScript = "<script>" + "document.getElementById('confirmButton').onclick = () => { const selectedValue = document.getElementById('choiceSelect').value; const selectedEnv = document.getElementById('envSelect').value; window.opener.postMessage({ choice: selectedValue, env: selectedEnv }, '*'); };" + "</script>";

        selectionWindow.document.write(htmlContent + htmlScript);

        // Populate the dropdown
        const choiceSelectElement = selectionWindow.document.getElementById('choiceSelect');
        choices.forEach((choice, index) => {
            const optionElement = selectionWindow.document.createElement('option');
            optionElement.value = index.toString();
            optionElement.textContent = labelFn!(choice);
            choiceSelectElement!.appendChild(optionElement);
        });
        const envSelectElement = selectionWindow.document.getElementById('envSelect');
        ["dev", "prod"].forEach((env, index) => {
            const optionElement = selectionWindow.document.createElement('option');
            optionElement.value = index.toString();
            optionElement.textContent = env;
            envSelectElement!.appendChild(optionElement);
        });

        // Setup message event listener
        window.addEventListener('message', async function onMessage(event) {
            if (event.source === selectionWindow) {
                window.removeEventListener('message', onMessage);
                selectionWindow.close();
                const selectedChoice = choices[parseInt(event.data.choice, 10)];
                const selectedEnv = ["dev", "prod"][parseInt(event.data.env, 10)];
                resolve(
                    {
                        account: await valueFn!(selectedChoice),
                        env: selectedEnv as any
                    }
                );
            }
        }, false);
    });

    const resolvedValue = await valuePromise;
    localStorage.setItem(selectionKey, JSON.stringify(resolvedValue));

    return resolvedValue;
}

async function web3SelectAccount(
    allAccounts: Array<any>
): Promise<any> {
    const selectionResult = await promptSelection(
        allAccounts,
        account => `${account.meta.name} (${account.address})`,
        {
            title: "Select a web3 account",
            message: "Please select a web3 account to use with this app from the dropdown below, and click the button to confirm your selection!",
            valueFn: account => account
        }
    );
    selectionResult.account = allAccounts.find(
        acc => acc.address === selectionResult.account.address
    );
    console.log(`web3SelectAccount`, selectionResult);
    return selectionResult;
}

export async function useDoggoWeb3(): Promise<IDoggoContract> {
    // Show authorization popup
    await web3Enable('Doggo');

    // Select user
    const {
        account,
        env
    } = await web3SelectAccount(await web3Accounts());

    // Create env
    const usedEnv = await useEnv(env);

    if(env === "dev") {
        return await useDevDoggoContract(account, usedEnv);
    } else if(env === "prod") {
        return await useProdDoggoContract(account, usedEnv);
    } else {
        throw new Error("Invalid env");
    }
}