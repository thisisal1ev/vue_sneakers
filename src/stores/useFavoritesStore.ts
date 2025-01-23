import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { ItemsProps } from '../@types'
import { getFavorites } from '../services/favorites'

export const useFavoritesStore = defineStore('favorites', () => {
	const favorites = ref<ItemsProps[]>([])

	async function fetchFavorites(): Promise<void> {
		try {
			const data = await getFavorites()
			favorites.value = data.value
		} catch (e) {
			console.error(e)
		}
	}

	return { favorites, fetchFavorites }
})