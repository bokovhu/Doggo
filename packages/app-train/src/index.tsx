import { $registerRoute, $router } from "@doggo/router";
import { Ref, useEffect, useRef } from "react";
import { TrainingGame } from "@doggo/training-game";

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

    const gameRef = useRef<TrainingGame>();

    useEffect(
        () => {
            console.log(`[Train]`, `Starting game`);
            gameRef.current = new TrainingGame();
            gameRef.current.start(
                document.getElementById('game')!
            );
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
