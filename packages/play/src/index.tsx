import { $registerRoute, $router } from "@alephhack/router";

export function Play() {

    const backToMainMenu = () => {
        $router.goto('main-menu');
    };

    const startMatch = () => {
        $router.goto('match');
    };

    return <div>
        <h1>Play</h1>
        <button onClick={startMatch}>Start match</button>
        <button onClick={backToMainMenu}>Back to main menu</button>
    </div>
}

$registerRoute({
    name: 'play',
    component: Play
});
