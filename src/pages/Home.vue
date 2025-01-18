<script lang="ts" setup>
import { reactive } from 'vue'
import axios from 'axios'

import { CardList, Header } from '../components'

import type { FiltersProps, ItemsProps } from '../@types'

interface Props {
	items: ItemsProps[]
	totalPrice: number
}

const filters = reactive<FiltersProps>({
	sortBy: 'title',
	searchQuery: '',
})

const addToFavorites = async (item: ItemsProps) => {
	try {
		if (!item.isFavorite) {
			const obj = {
				parentId: item.id,
			}
			item.isFavorite = true

			const { data } = await axios.post(
				`https://401627320f117569.mokky.dev/favorites`,
				obj
			)

			item.favoriteId = data.id
		} else {
			item.isFavorite = false
			await axios.delete(
				`https://401627320f117569.mokky.dev/favorites/${item.favoriteId}`
			)

			item.favoriteId = null
		}
	} catch (e) {
		console.log(e)
	}
}

defineProps<Props>()
defineEmits(['sort', 'search', 'open', 'addToCart'])
</script>
02.

<template>
	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
		<Header :totalPrice @openDrawer="$emit('open')" />

		<div class="p-10">
			<div class="flex justify-between items-center mb-10">
				<h1 class="text-3xl font-bold">Все кроссовки</h1>

				<div class="flex items-center gap-4">
					<select
						v-model="filters.sortBy"
						@change="$emit('sort', filters.sortBy)"
						class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
					>
						<option value="title" selected>По названию</option>
						<option value="-price">По цене (дорогие)</option>
						<option value="price">По цене (дешевые)</option>
					</select>

					<div class="relative">
						<input
							v-model="filters.searchQuery"
							@input="$emit('search', filters.searchQuery)"
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
					:items
					@addToFavorites="(item: ItemsProps )=> addToFavorites(item)"
					@addToCart="(item: ItemsProps )=> $emit('addToCart', item)"
				/>
			</div>
		</div>
	</div>
</template>
