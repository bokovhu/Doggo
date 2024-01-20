import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { ApiPromise, WsProvider } from '@polkadot/api';

const Web3Context = createContext({
    api: null as ApiPromise | null,
});

export function useWeb3() {
    return useContext(Web3Context);
}

export function WithWeb3(
    opts: {
        children: ReactNode
    }
) {
    const [didSetup, setDidSetup] = useState(false);
    const [setupError, setSetupError] = useState<Error | string | null>(null);
    const [nodeUrl, setNodeUrl] = useState("ws://localhost:9944");
    const [web3Context, setWeb3Context] = useState({
        api: null as ApiPromise | null,
    });

    const wsProviderRef = useRef<WsProvider | null>(null);
    const apiRef = useRef<ApiPromise | null>(null);

    const failWithSetupError = (err: Error | string) => {
        setSetupError(err);
        setDidSetup(true);
    };
    const succeedWithSetup = () => {
        setSetupError(null);
        setDidSetup(true);
    };

    useEffect(
        () => {

            const asyncSetup = async () => {
                const allInjected = await web3Enable("Doggo (the game)");
                const allAccounts = await web3Accounts({
                    accountType: [
                        "sr25519"
                    ]
                });
                console.log("[WithWeb3]", "[asyncSetup]", "allInjected", allInjected);
                console.log("[WithWeb3]", "[asyncSetup]", "allAccounts", allAccounts);

                console.log("[WithWeb3]", "[asyncSetup]", "connecting to node", nodeUrl);
                wsProviderRef.current = new WsProvider(nodeUrl);
                apiRef.current = await ApiPromise.create({
                    provider: wsProviderRef.current
                });
                setWeb3Context({
                    api: apiRef.current
                });
                console.log("[WithWeb3]", "[asyncSetup]", "connected to node", nodeUrl, apiRef.current);
            };

            asyncSetup()
                .then(() => succeedWithSetup())
                .catch((err) => {
                    failWithSetupError(err);
                });

        },
        []
    );

    if (didSetup) {
        if (typeof setupError === "string") {
            return <div>WEB3 SETUP ERROR: {setupError}</div>
        } else if (setupError instanceof Error) {
            return <div>WEB3 SETUP ERROR: {setupError.message}</div>
        } else {
            return <Web3Context.Provider value={web3Context}>
                {opts.children}
            </Web3Context.Provider>;
        }
    } else {
        return <div>Please wait while setting up web3 ...</div>
    };
}