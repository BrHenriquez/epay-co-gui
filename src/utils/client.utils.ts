import dayjs from "dayjs";
import { IClient } from "../types/client.type";

export const mappClients = (clients: IClient[]) => {
    return clients?.map((client) => ({
        ...client,
        balanceHistory: client?.balanceHistory?.map((balance) => ({
            ...balance,
            date: dayjs(balance.date).format('YYYY-MM-DD[ - ]hh:mm a')
        }))
    }))
}