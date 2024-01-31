import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { program } from "commander";
import CONTRACT_DATA from "./contract.json";
import { BN, BN_ONE } from "@polkadot/util";
import { CodePromise } from "@polkadot/api-contract";
import fs from "fs";
import path from "path";

function userKey(keyring: Keyring) {
    return keyring.pairs.find(pair => pair.meta.name === "user");
}

async function connectToChain(nodeUrl: string) {
    console.log(`⚙️ Connecting to chain with RPC URL`, nodeUrl);
    const wsProvider = new WsProvider(nodeUrl);
    const apiPromise = await ApiPromise.create({ provider: wsProvider });
    await apiPromise.isReady;
    console.log(`⚙️ Connected to chain, API is ready`);
    return apiPromise;
}

async function createKeyring(suri: string) {
    const keyring = new Keyring({ type: 'sr25519' });
    const user = keyring.addFromUri(suri, { name: 'user' });
    return keyring;
}

async function deployCode(
    api: ApiPromise,
    keyring: Keyring
): Promise<{ address: string }> {
    console.log(`⚙️ Deploying contract code to chain ...`);
    const gasLimit = api.registry.createType("WeightV2", {
        refTime: new BN("2000000000"),
        proofSize: new BN("200000"),
    });
    const storageDepositLimit = null;

    const codeObject = new CodePromise(
        api,
        CONTRACT_DATA,
        CONTRACT_DATA.source.wasm
    );
    const newCodeTx = codeObject.tx.new(
        { gasLimit: gasLimit as any, storageDepositLimit }
    );

    const user = userKey(keyring);
    const contractAddress = await new Promise<string>(async (resolve, reject) => {
        const unsub = await newCodeTx.signAndSend(
            user as any,
            ({ contract, status }: any) => {
                if (status.isInBlock) {
                    console.log(`⚙️ In block!`);
                    unsub();
                    resolve(contract?.address!.toString());
                } else if (status.isFinalized) {
                    console.log(`⚙️ Finalized!`);
                } else if (status.isDropped || status.isInvalid || status.isUsurped) {
                    console.log(`⚙️ Failed!`);
                    unsub();
                    reject();
                }
            }
        );
    });

    console.log(`⚙️ Code deployed to chain, address is ${contractAddress}`);

    return { address: contractAddress };
}

function generateCode(
    envName: string,
    address: string,
    nodeUrl: string,
    abi: any
): Array<{path: string, content: string}> {
    console.log(`⚙️ Generating code ...`);
    
    const actualAbi = Object.assign(
        {},
        abi,
        {
            source: {
                hash: abi.source.hash
            }
        }
    );
    
    return [
        {
            path: "deploy-params.ts",
            content: `export const ${envName.toUpperCase()}_CONTRACT_ADDRESS = "${address}";\n`
                + `export const ${envName.toUpperCase()}_CONTRACT_NODE_URL = "${nodeUrl}";\n`
                + `export const ${envName.toUpperCase()}_CONTRACT_ABI = ${JSON.stringify(actualAbi, null, 4)};\n`
        },
        {
            path: "contract-abi.json",
            content: JSON.stringify(actualAbi, null, 4)
        }
    ];
}

async function writeCode(
    outputDir: string,
    code: Array<{path: string, content: string}>
) {
    console.log(`⚙️ Writing code to disk ...`);

    for (const { path: filePath, content } of code) {
        const fullPath = path.join(outputDir, filePath);
        const dirPath = path.dirname(fullPath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(fullPath, content);
        console.log(`⚙️ Written code to disk at ${fullPath}`);
    }
}

async function deployDoggoContract(
    options: {
        nodeUrl: string;
        envName: string;
        contractFile: string;
        suri: string;
        outputDir: string
    }
) {
    
    const api = await connectToChain(options.nodeUrl);
    const keyring = await createKeyring(options.suri);

    try {

        console.log(`⚙️ Deploying contract to chain ...`);

        const { address } = await deployCode(api, keyring);

        console.log(`⚙️ Contract deployed to chain, address is ${address}`);

        console.log(`⚙️ Generating code ...`);

        const code = generateCode(options.envName, address, options.nodeUrl, CONTRACT_DATA);

        console.log(`⚙️ Writing code to disk ...`);

        await writeCode(options.outputDir, code);

        console.log(`⚙️ Code written to disk`);

    } catch (err) {
        throw err;
    } finally {
        console.log(`⚙️ Closing connection to chain ...`);

        await api.disconnect();

        console.log(`⚙️ Connection to chain closed`);
    }

}

async function main() {
    
    program.option("-u, --node-url <nodeUrl>", "sets the deploy node URL", "ws://127.0.0.1:9944")
        .option("-e, --env-name <envName>", "sets the env name for the generated code", "dev")
        .option("-s, --suri <deployerSuri>", "SURI of the deployer account", "//Alice")
        .option("-o, --output-dir <outputDirectory>", "path to the generated code directory", "./generated");
    
    program.action(
        async (options) => {
            
            await deployDoggoContract(options);

        }
    );
    
    await program.parseAsync(process.argv);

}

main().then(
    () => {
        console.log(`✅ Finished successfully.`);
        process.exit(0);
    },
    (err) => {
        console.error(`❌ Finished with error: ${err}`);
        process.exit(1);
    }
);