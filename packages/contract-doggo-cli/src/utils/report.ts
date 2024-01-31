import { GameCardGenerator, formatCardDescription } from "@doggo/card-game";
import {
    outResult,
} from "./logging";
import { MICRO_APPS } from "./microapps";

// CLI reporters

export const reportCard = (card: number) => {
    const generator = new GameCardGenerator();
    const generatedCard = generator.generateCard(card);
    const markdownString = formatCardDescription(generatedCard);
    outResult(
        `MARKDOWN`, markdownString,
        `URL`, MICRO_APPS.cardDetails({ cardId: card }),
        `ID`, card
    );
};

export const reportCards = (cards: Array<number>) => {
    const generator = new GameCardGenerator();
    const generatedCards = cards.map((card) => generator.generateCard(card));
    const markdownStrings = generatedCards.map((card) => formatCardDescription(card));
    outResult(
        `MARKDOWN`,
        markdownStrings.map(md => `* ${md}`).join(`\n\n`),
        `URLS`,
        cards.map(card => MICRO_APPS.cardDetails({ cardId: card })),
        `IDS`,
        cards
    );
};

export const reportChallenge = (challenge: any) => {
    outResult(`CHALLENGE`, challenge);
};

export const reportChallenges = (challenges: Array<any>) => {
    outResult(`CHALLENGES`, challenges);
};

export const reportMember = (accountId: string) => {
    outResult(`URL`, MICRO_APPS.memberDetails({ accountId }));
};

export const reportAny = (data: any) => {
    outResult(`ANY`, data);
};

export const reportMembershipStatus = (status: number) => {
    if (status === 1) {
        outResult(`MEMBERSHIP`, true);
    } else {
        outResult(`MEMBERSHIP`, false);
    }
};

export const reportChallengeStatus = (status: number) => {
    if (status === 0) {
        outResult(`CHALLENGE`, `PENDING`);
    } else if (status === 1) {
        outResult(`CHALLENGE`, `ACCEPTED`);
    } else if (status === 2) {
        outResult(`CHALLENGE`, `COMPLETED`);
    } else {
        outResult(`CHALLENGE`, `UNKNOWN`);
    }
};

export const reportTimestamp = (timestamp: number) => {
    outResult(`TIMESTAMP`, new Date(timestamp).toISOString());
}
