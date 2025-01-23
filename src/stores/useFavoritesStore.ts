import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getFavorites } from '../services/favorites'
import type { ItemsProps } from '../@types'

export const useFavoritesStore = defineStore('favorites', () => {
	const favorites = ref<ItemsProps[]>([])

	async function fetchFavorites() {
		try {
			const data = await getFavorites()
			favorites.value = data.value
		} catch (e) {
			console.error(e)
		}
	}

	return { favorites, fetchFavorites }
})