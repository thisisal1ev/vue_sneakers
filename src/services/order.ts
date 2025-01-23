import type { IOrderProps, ItemsProps } from '../@types'
import { axiosInstance } from './instance'

export async function makeOrder({ cartStore, itemsStore }: IOrderProps) {
	try {
		const { data } = await axiosInstance.post(`/orders`, {
			items: cartStore.cart,
			totalPrice: cartStore.totalPrice,
		})

		cartStore.cart = []
		itemsStore.items = itemsStore.items.map((item: ItemsProps) => ({
			...item,
			isAdded: false,
		}))

		return data
	} catch (e) {
		console.log(e)
	}
}