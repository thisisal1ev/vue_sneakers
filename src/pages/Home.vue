<script lang="ts" setup>
import { inject, reactive } from 'vue'

import type { FiltersProps, ItemsProps } from '../@types'
import { CardList } from '../components'
import { addToFavorites } from '../services/favorites'
import { useCartStore, useItemsStore } from '../stores'

const itemsStore = useItemsStore()
const cartStore = useCartStore()
const filters = reactive<FiltersProps>({
	sortBy: 'title',
	searchQuery: '',
})

const {
	sort,
	search,
}: {
	sort: (sortBy: string) => void
	search: (searchQuery: string) => void
} = inject('items', {
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
			@addToCart="(item: ItemsProps )=> cartStore.addOrRemoveFromCart(item)"
		/>
	</div>
</template>
