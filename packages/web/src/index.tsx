import {
    createRoot
} from "react-dom/client";
import {
    useEffect
} from "react";

import "@doggo/app-main-menu";
import "@doggo/app-match";
import "@doggo/app-play";
import "@doggo/app-train";
import "@doggo/app-inventory";
import {
    $router,
    RouterView
} from "@doggo/router";

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

