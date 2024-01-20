import { $registerRoute, $router } from "@doggo/router"
import { useEffect, useState } from "react";
import { WithWeb3, useWeb3 } from "@doggo/app-with-web3";
import { ContractPromise } from '@polkadot/api-contract';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@doggo/contracts";

export function CheckMembership() {
    const [statusText, setStatusText] = useState('Checking membership ...');
    const web3Context = useWeb3();

    useEffect(
        () => {
            // TODO: Integrate with Polkadot.JS extension
            // TODO: Ask for address in become member
            // TODO: Load address into web3 context
            const isMember = localStorage.getItem('isMember') === 'true';

            const { api } = web3Context;

            if (isMember) {
                setStatusText('You are a member!');
                setTimeout(
                    () => {
                        $router.goto('main-menu');
                    },
                    1000
                );
            } else {
                setStatusText('You are not a member!');
                setTimeout(
                    () => {
                        $router.goto('become-member');
                    },
                    1000
                );
            }
        },
        []
    );
    return <div>
        <h1>Check membership</h1>
        <p>{statusText}</p>
    </div>;

}

function CheckMembershipWithWeb3() {
    return <WithWeb3>
        <CheckMembership />
    </WithWeb3>;
}

$registerRoute({
    name: 'check-membership',
    component: CheckMembershipWithWeb3
});
