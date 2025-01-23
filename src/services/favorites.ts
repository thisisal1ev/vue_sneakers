import { ref, type Ref } from 'vue'

import { axiosInstance } from './instance'
import type { FavoritesProps, ItemsProps } from '../@types'

const favorites = ref<ItemsProps[]>([])

export async function getFavorites(): Promise<Ref<ItemsProps[]>> {
	try {
		const { data } = await axiosInstance.get(
			'/favorites?_relations=items'
		)

		favorites.value = data.map((item: FavoritesProps) => item.item)

		return favorites
	} catch (e) {
		console.error(e)
		return favorites
	}
}