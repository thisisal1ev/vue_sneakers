import { ref, type Ref } from 'vue'

import type { FavoritesProps, ItemsProps } from '../@types'
import { axiosInstance } from './instance'

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


export async function addToFavorites(item: ItemsProps): Promise<void> {
	try {
		if (!item.isFavorite) {
			const obj = {
				itemId: item.id,
				item,
			}

			item.isFavorite = true

			const { data } = await axiosInstance.post(`/favorites`, obj)

			item.favoriteId = data.id
		} else {
			item.isFavorite = false
			await axiosInstance.delete(`/favorites/${item.favoriteId}`)

			item.favoriteId = null
		}
	} catch (e) {
		console.log(e)
	}
}