export interface IClient {
    name: string;
    balance: number | undefined;
    document: string;
    phone: string;
    email: string;
    _id: string;
    balanceHistory: BalanceHistory[]
}

export type BalanceHistory = {
    amount: number;
    balance: number;
    date: string;
    _id: string;
    type: 'income' | 'expense'
}