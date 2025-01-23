<script lang="ts" setup>
import { inject, reactive } from 'vue'

import type { FiltersProps, ItemsProps } from '../@types'
import { CardList } from '../components'
import { axiosInstance } from '../services/instance'
import { useItemsStore } from '../stores/useItemsStore'

const itemsStore = useItemsStore()
const filters = reactive<FiltersProps>({
	sortBy: 'title',
	searchQuery: '',
})

const addToFavorites = async (item: ItemsProps) => {
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

const {
	addOrRemoveFromCart,
	sort,
	search,
}: {
	addOrRemoveFromCart: (item: ItemsProps) => void
	sort: (sortBy: string) => void
	search: (searchQuery: string) => void
} = inject('items', {
	addOrRemoveFromCart: (value: ItemsProps) => console.log(value),
	sort: (value: string) => console.log(value),
	search: (value: string) => console.log(value),
})
</script>

<template>
	<div class="flex justify-between items-center mb-10">
		<h1 class="text-3xl font-bold">Все кроссовки</h1>

		<div class="flex items-center gap-4">
			<select
				v-model="filters.sortBy"
				@change="sort(filters.sortBy)"
				class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
			>
				<option value="title" selected>По названию</option>
				<option value="-price">По цене (дорогие)</option>
				<option value="price">По цене (дешевые)</option>
			</select>

			<div class="relative">
				<input
					v-model="filters.searchQuery"
					@input="search(filters.searchQuery)"
					type="search"
					class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
					placeholder="Поиск..."
				/>

				<div
					class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
				>
					<img src="/icons/search.svg" />
				</div>
			</div>
		</div>
	</div>

	<div class="mt-10">
		<CardList
			:items="itemsStore.items"
			@addToFavorites="(item: ItemsProps )=> addToFavorites(item)"
			@addToCart="(item: ItemsProps )=> addOrRemoveFromCart(item)"
		/>
	</div>
</template>
