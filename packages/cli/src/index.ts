import { GameCardGenerator, formatCardDescription } from "@doggo/card-game";

function main() {

    const cardGenerator = new GameCardGenerator();

    const generatedCards = [];
    const numCards = 1000;

    for (let i = 0; i < numCards; i++) {
        generatedCards.push(cardGenerator.generateCard(i));
    }

    for (let card of generatedCards) {
        console.log(`${card.id} >>> ${formatCardDescription(card)}`);
    }

}

main();