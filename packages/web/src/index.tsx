import {
    createRoot
} from "react-dom/client";
import {
    useEffect
} from "react";

import "@alephhack/main-menu";
import "@alephhack/match";
import "@alephhack/play";
import "@alephhack/train";
import "@alephhack/inventory";
import {
    $router,
    RouterView
} from "@alephhack/router";

function App() {
    useEffect(
        () => {
            console.log(`[App]`, `Routing to main-menu`);
            $router.goto('main-menu');
        },
        []
    );
    return <RouterView />;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

