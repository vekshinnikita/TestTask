
import { API_URL } from '~/env'
import axios from 'axios'
import { ITickerPrice } from '~/types/api'


export const ProductsAPI = {
    
    
    async getPrice(ticker: string) {
    return axios
            .get<ITickerPrice>(API_URL + `/api/v3/ticker/price?symbol=${ticker}`)
    },
}