import { ref, type Ref } from 'vue'

import { axiosInstance } from './instance'
import type { TItems } from '../items.data'
import type { FavoriteProps, FiltersProps, ItemsProps } from '../@types'

const items = ref<ItemsProps[]>([])

export async function getItems(props: FiltersProps): Promise<Ref<ItemsProps[]>> {
	try {
		const params = {
			sortBy: props.sortBy,
			title: `*${props.searchQuery}*`,
		}

		const { data } = await axiosInstance.get('/items', {
			params,
		})

		items.value = data.map((obj: TItems) => ({
			...obj,
			isFavorite: false,
			isAdded: false,
			favoriteId: null,
		}))

		return items
	} catch (e) {
		console.error(e)
		return items
	}
}

export async function getFavorites(): Promise<Ref<ItemsProps[]>> {
	try {
		const { data: favorites } = await axiosInstance.get(
			`/favorites`
		)

		items.value = items.value.map((item: ItemsProps) => {
			const favorite = favorites.find(
				(favorite: FavoriteProps) => favorite.itemId === item.id
			)

			if (!favorite) return item

			return {
				...item,
				isFavorite: true,
				favoriteId: favorite.id,
			}
		})

		return items
	} catch (e) {
		console.error(e)
		return items
	}
}