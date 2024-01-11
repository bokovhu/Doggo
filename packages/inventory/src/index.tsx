import { $registerRoute, $router } from "@alephhack/router";

export function Inventory() {

    const backToMainMenu = () => {
        $router.goto('main-menu');
    };

    return <div>
        <h1>Inventory</h1>
        <button onClick={backToMainMenu}>Back to main menu</button>
    </div>
}

$registerRoute({
    name: 'inventory',
    component: Inventory
});
