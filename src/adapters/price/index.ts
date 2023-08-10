import { useQuery } from 'react-query'
import { ProductsAPI } from './api';

export const usePrice = (ticker: string | undefined) => {
	const { isLoading, data: coeff } = useQuery(
		['get price', ticker],
		() => ProductsAPI.getPrice(String(ticker)),
		{   
			onError: (error: any) => {
				console.log(error.message)
			},
            select: ({data}) => data.price,
			enabled: !!ticker,
			staleTime: 120000
		}
	)

	return { isLoading, coeff }
}