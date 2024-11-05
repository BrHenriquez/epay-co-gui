import { IClient } from "../types/client.type";
import { httpService } from "./http_service";

const { get, post } = httpService();

export const getAllClients = () => get('/clients');

export const registerClient = (data: Partial<IClient>) => post('/register', data)