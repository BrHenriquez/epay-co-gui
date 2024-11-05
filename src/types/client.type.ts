export interface IClient {
    name: string;
    balance: number | undefined;
    document: string;
    phone: string | number;
    email: string;
    sessionsTokens?: SessionToken[]
}

export type SessionToken = {
    sessionId: string;
    token: string;
    expiresAt: string;
}