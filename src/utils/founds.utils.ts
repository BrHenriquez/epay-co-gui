
export interface Header {
    id: string;
    align?: "left" | "center" | "right" | "inherit" | "justify" | undefined;
    hidden?: boolean;
}

export const foundsHeaders: Header[] = [
    {
        id: 'date',
    },
    {
        id: 'amount',
        align: 'center'
    },
    {
        id: 'balance',
        align: 'center'
    }
]