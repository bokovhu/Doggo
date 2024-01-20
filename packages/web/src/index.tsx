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
import "@doggo/app-trade";
import "@doggo/app-mint";
import "@doggo/app-social";
import "@doggo/app-become-member";
import "@doggo/app-check-membership";
import "@doggo/app-challenges";
import {
    $router,
    RouterView
} from "@doggo/router";

function App() {
    useEffect(
        () => {
            console.log(`[App]`, `Routing to check-membership`);
            $router.goto('check-membership');
        },
        []
    );
    return <RouterView />;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

