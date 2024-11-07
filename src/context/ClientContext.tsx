import React, { createContext, useState } from 'react'
import { IClient } from '../types/client.type'
import { mappClients } from '../utils/client.utils';

type ClientContextState = {
    clients: IClient[];
    setClients: React.Dispatch<React.SetStateAction<IClient[]>>;
    updateClient: (data: Partial<IClient>, id: string | undefined) => void;
    clientSelected: IClient | undefined;
    selectClient: (id: string) => void;
}

const ClientContext = createContext<ClientContextState>({} as ClientContextState);

interface IClientContextProviderProps {
    children: React.ReactElement[] | React.ReactElement;
}

export const ClientContextProvider = (props: IClientContextProviderProps) => {
    const { children } = props;
    const [clients, setClients] = useState<IClient[]>([]);
    const [clientSelected, setClientSelected] = useState<IClient | undefined>(undefined);

    const selectClient = (id: string) => {
        if (id && clients) {
            const client = clients.find((client) => client._id === id);
            setClientSelected(client);
        }
        return undefined
    };

    const updateClient = (data: Partial<IClient>, id: string | undefined) => {
        if (!id) return;
        const clientsUpdated = clients.map((client) => {
            if (client._id === id) {
                const updatedData = { ...client, ...data };
                setClientSelected(updatedData)
                return updatedData
            } else {
                return client;
            }
        })
        setClients(mappClients(clientsUpdated))
    }

    return (
        <ClientContext.Provider value={{ clients, setClients, updateClient, clientSelected, selectClient }}>
            {children}
        </ClientContext.Provider>
    )
}
const useClientContext = () => {
    const context = React.useContext(ClientContext)
    if (context === undefined) {
        throw new Error('useClientContext must be used within a Client Context Provider');
    }
    return context;
}

export default useClientContext;
