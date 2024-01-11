import { $registerRoute, $router } from "@alephhack/router"

export function MainMenu() {

    const onClickPlay = () => {
        $router.goto('play');
    };
    const onClickTrain = () => {
        $router.goto('train');
    };
    const onClickInventory = () => {
        $router.goto('inventory');
    };

    return <div>
        <button onClick={onClickPlay}>Play</button>
        <button onClick={onClickTrain}>Train</button>
        <button onClick={onClickInventory}>Inventory</button>
    </div>

}

$registerRoute({
    name: 'main-menu',
    component: MainMenu
});
