import { useDoggoWeb3 } from '@doggo/contract-doggo-client-web3';
import { GameCardGenerator, formatCardDescription } from '@doggo/card-game';
import { createRoot } from "react-dom/client";
import * as marked from 'marked';

function MicroApp(
    opts: {
        cardDescriptionMarkdown: string,
        cardOwner?: string
    }
) {

    const renderedMarkdown = marked.marked(opts.cardDescriptionMarkdown);

    return <div>
        <h1>Card description</h1>
        <p dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
        <p>
            Owner: <b>
                {
                    opts.cardOwner === "Noone"
                        ? opts.cardOwner
                        : <a href={`http://127.0.0.1:4002#${btoa(JSON.stringify({ accountId: opts.cardOwner }))}`}
                            target='_blank'
                        >{`${opts.cardOwner}`}</a>
                }
            </b>
        </p>
    </div>;

}

function ErrorMicroApp(
    opts: {
        message: string
    }
) {

    return <div>
        <h1>Error</h1>
        <p>
            {opts.message}
        </p>
    </div>


}

function onError(root: any, err: any) {
    root.render(
        <ErrorMicroApp
            message={`${err}`}
        />
    );
}

async function main() {

    const root = createRoot(document.getElementById("app")!);

    try {

        const contract = await useDoggoWeb3();

        const hashString = location.hash;
        if (hashString.length === 0) {
            root.render(
                <ErrorMicroApp
                    message="No hash provided"
                />
            );
            return;
        }

        const hashBase64Decoded = atob(hashString.startsWith("#") ? hashString.substring(1) : hashString);
        const hashData = JSON.parse(hashBase64Decoded);
        const {
            cardId
        } = hashData;

        const cardGenerator = new GameCardGenerator();
        const generatedCard = cardGenerator.generateCard(cardId);
        const cardDescriptionMarkdown = formatCardDescription(generatedCard);

        let cardOwner = "";
        try {
            cardOwner = await contract.getCardOwner({
                cardId: cardId
            });
        } catch (e) {
            cardOwner = "Noone";
        }

        root.render(
            <MicroApp
                cardDescriptionMarkdown={cardDescriptionMarkdown}
                cardOwner={cardOwner}
            />
        );

    } catch (e) {
        onError(root, e);
    }


}

main().then(
    () => console.log('micro-app done'),
).catch(
    (e) => console.error('micro-app error', e),
)