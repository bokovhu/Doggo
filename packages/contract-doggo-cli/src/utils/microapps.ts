export const MICRO_APPS: Record<string, (opts: any) => string> = {
    cardDetails: (data: any) => `http://127.0.0.1:4001#${btoa(JSON.stringify(data))}`,
    memberDetails: (data: any) => `http://127.0.0.1:4002#${btoa(JSON.stringify(data))}`,
    challengeDetails: (data: any) => `http://127.0.0.1:4000#${btoa(JSON.stringify(data))}`,
}