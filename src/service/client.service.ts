import { IClient } from "../types/client.type";
import { httpService } from "./http_service";

const { get, post, _delete } = httpService();

export const getAllClients = () => get('/clients');

export const registerClient = (data: Partial<IClient>) => post('/register', data);

export const addFounds = (data: Partial<IClient & { amount: number }>) => post('/recharge', data);

export const initiatePayment = (data: { document: string, phone: string, amount: number }) => post('/initiate-payment', data)

export const confirmPayment = (data: { token: string, sessionId: string, document: string, amount: number }) => post('/confirm-payment', data);

export const removeClient = (id: string) => _delete('/remove', { id });