import { $registerRoute, $router } from "@alephhack/router";
import { Ref, useEffect, useRef } from "react";
import { TrainGame } from "./TrainGame";

interface TrainingUIOpts {
    game: Ref<TrainGame | undefined>;
    onBackToMainMenu: () => void;
}

function TrainingUI(
    opts: TrainingUIOpts
) {
    return <div>
        <h1>Training UI</h1>
        <button onClick={opts.onBackToMainMenu}>Back to main menu</button>
    </div>
}

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


    return <TrainingUI
        game={gameRef}
        onBackToMainMenu={backToMainMenu}
    />

}

$registerRoute({
    name: 'train',
    component: Train
});
