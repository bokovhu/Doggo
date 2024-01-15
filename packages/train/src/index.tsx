import { $registerRoute, $router } from "@alephhack/router";
import { useEffect, useRef } from "react";
import { TrainGame } from "./TrainGame";

export function Train() {

    const gameRef = useRef<TrainGame>();

    useEffect(
        () => {
            console.log(`[Train]`, `Starting game`);
            gameRef.current = new TrainGame();
            gameRef.current.start();
            return () => {
                console.log(`[Train]`, `Stopping game`);
                gameRef.current?.stop();
            };
        },
        []
    )

    const backToMainMenu = () => {
        $router.goto('main-menu');
    };

    return <div>
        <h1>Train</h1>
        <button onClick={backToMainMenu}>Back to main menu</button>
    </div>
}

$registerRoute({
    name: 'train',
    component: Train
});
