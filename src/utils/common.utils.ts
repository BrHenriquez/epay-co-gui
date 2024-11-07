export const capitalizeString = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const currencyFormat = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        value,
    )
}