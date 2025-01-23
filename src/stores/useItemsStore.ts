import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { FiltersProps, ItemsProps } from '../@types'
import { getFavorites, getItems } from '../services/items'

export const useItemsStore = defineStore('items', () => {
	const items = ref<ItemsProps[]>([])

	async function fetchItems(props: FiltersProps): Promise<void> {
		try {
			const data = await getItems(props)
			items.value = data.value
		} catch (e) {
			console.error(e)
		}
	}

	async function fetchFavorites(): Promise<void> {
		try {
			const data = await getFavorites()
			items.value = data.value
		} catch (e) {
			console.error(e)
		}
	}

	return { items, fetchItems, fetchFavorites }
})