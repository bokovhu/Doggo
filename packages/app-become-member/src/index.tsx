import { $registerRoute, $router } from "@doggo/router"
import { useState } from "react";

export function BecomeMember() {
    const [statusText, setStatusText] = useState('');
    const onBecomeMember = () => {
        // TODO: Integrate with Polkadot.JS extension
        localStorage.setItem('isMember', 'true');
        setStatusText('You are now a member!');
        setTimeout(
            () => {
                $router.goto('main-menu');
            },
            1000
        );
    }

    return <div>
        <h1>Become a member</h1>
        <p>{statusText}</p>
        <button onClick={onBecomeMember}>Become a member</button>
    </div>;

}

$registerRoute({
    name: 'become-member',
    component: BecomeMember
});
