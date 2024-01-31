import { useDoggoWeb3 } from '@doggo/contract-doggo-client-web3';
import { GameCardGenerator, formatCardDescription } from '@doggo/card-game';
import { createRoot } from "react-dom/client";
import * as marked from 'marked';

function MicroApp(
    opts: {
        accountId: string,
        isMember: boolean,
        ownedCards: { md: string, cardId: string }[],
        challengesAsChallenger: string[],
        challengesAsOpponent: string[]
    }
) {

    const renderedCards = opts.ownedCards.map(
        (c: any) => {
            const renderedMarkdown = marked.marked(c.md);
            return { html: renderedMarkdown, cardId: c.cardId };
        }
    );

    return <div>
        <h1>Member</h1>
        <p>
            Account ID: <b>{opts.accountId}</b>
        </p>
        <p>
            <h2>Owned cards</h2>
            {
                renderedCards.map(
                    (card) => {
                        return <>
                            <h3>
                                <a href={`http://127.0.0.1:4001#${btoa(JSON.stringify({ cardId: card.cardId }))}`}
                                    target='_blank'
                                >Card { card.cardId }</a>
                            </h3>
                            <p dangerouslySetInnerHTML={{ __html: card.html }} />
                            <hr />
                        </>
                    }
                )
            }
        </p>
        <p>
            <h2>Challenges as challenger</h2>
            <ul>
                {
                    opts.challengesAsChallenger.map(
                        (challengeText) => {
                            return <li>{challengeText}</li>
                        }
                    )
                }
            </ul>
        </p>

        <p>
            <h2>Challenges as opponent</h2>
            <ul>
                {
                    opts.challengesAsOpponent.map(
                        (challengeText) => {
                            return <li>{challengeText}</li>
                        }
                    )
                }
            </ul>
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
            accountId
        } = hashData;

        const cardGenerator = new GameCardGenerator();

        const ownedCardIds = await contract.getCardsOfOwner({
            accountId
        });
        const challengeIds = {
            asChallenger: await contract.getChallengesOfMemberAsChallenger({
                accountId
            }),
            asOpponent: await contract.getChallengesOfMemberAsOpponent({
                accountId
            })
        };
        const mapChallenge = async (challengeId: number) => {
            return {
                challenger: await contract.getChallengeChallengerAccountId({
                    challengeId
                }),
                opponent: await contract.getChallengeOpponentAccountId({
                    challengeId
                }),
                offeredCardIds: await contract.getChallengeOfferedCards({
                    challengeId
                }),
                wantedCardIds: await contract.getChallengeWantedCards({
                    challengeId
                }),
                wantedPot: await contract.getChallengeWantedPotTokens({
                    challengeId
                }),
                betPot: await contract.getChallengeBetPotTokens({
                    challengeId
                }),
                status: await contract.getChallengeStatus({
                    challengeId
                }),
                submissionTimestamp: await contract.getChallengeSubmissionTimestamp({
                    challengeId
                }),
                acceptDeadline: await contract.getChallengeAcceptDeadlineTimestamp({
                    challengeId
                }),
                winner: await contract.getChallengeWinnerAccountId({
                    challengeId
                }),
            }
        };
        const isMember = await contract.getMembershipStatus({
            accountId
        }) === 1;
        const ownedCards = ownedCardIds.map(
            (cardId) => {
                return cardGenerator.generateCard(cardId);
            }
        ).map(
            (card) => {
                return {
                    md: formatCardDescription(card),
                    cardId: card.id
                }
            }
        );
        const challengesAsChallenger = (await Promise.all(
            challengeIds.asChallenger.map(
                mapChallenge
            )
        )).map(
            (challenge) => `${challenge.challenger} vs ${challenge.opponent}, status: ${challenge.status}, winner: ${challenge.winner}, offered cards: ${challenge.offeredCardIds.join(", ")}, wanted cards: ${challenge.wantedCardIds.join(", ")}, wanted pot: ${challenge.wantedPot}, bet pot: ${challenge.betPot}, submission timestamp: ${challenge.submissionTimestamp}, accept deadline: ${challenge.acceptDeadline}`
        );
        const challengesAsOpponent = (await Promise.all(
            challengeIds.asOpponent.map(
                mapChallenge
            )
        )).map(
            (challenge) => `${challenge.challenger} vs ${challenge.opponent}, status: ${challenge.status}, winner: ${challenge.winner}, offered cards: ${challenge.offeredCardIds.join(", ")}, wanted cards: ${challenge.wantedCardIds.join(", ")}, wanted pot: ${challenge.wantedPot}, bet pot: ${challenge.betPot}, submission timestamp: ${challenge.submissionTimestamp}, accept deadline: ${challenge.acceptDeadline}`
        );

        root.render(
            <MicroApp
                accountId={accountId}
                isMember={isMember}
                ownedCards={ownedCards as any}
                challengesAsChallenger={challengesAsChallenger}
                challengesAsOpponent={challengesAsOpponent}
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