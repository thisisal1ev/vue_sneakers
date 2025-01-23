import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getFavorites, getItems } from '../services/items'
import type { FiltersProps, ItemsProps } from '../@types'

export const useItemsStore = defineStore('items', () => {
	const items = ref<ItemsProps[]>([])

	async function fetchItems(props: FiltersProps) {
		try {
			const data = await getItems(props)
			items.value = data.value
		} catch (e) {
			console.error(e)
		}
	}

	async function fetchFavorites() {
		try {
			const data = await getFavorites()
			items.value = data.value
		} catch (e) {
			console.error(e)
		}
	}

	return { items, fetchItems, fetchFavorites }
})