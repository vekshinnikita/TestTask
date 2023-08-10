export enum enumCurrency {
    BTC = "BTC",
    ETH = "ETH",
    USDT = "USDT",
}

export interface ICurrency {
    label: enumCurrency,
    image: string,
    fullname: string,
}