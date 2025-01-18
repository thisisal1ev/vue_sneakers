<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import axios, { AxiosError } from 'axios'
import type { TItems } from './items.data'
import type { FavoriteProps, FiltersProps, ItemsProps } from './@types'

import Home from './pages/Home.vue'
import Drawer from './components/Drawer.vue'

const items = ref<ItemsProps[]>([])
const isDrawerOpen = ref<boolean>(false)
const filters = reactive<FiltersProps>({
	sortBy: 'title',
	searchQuery: '',
})

const toggleDrawer = (): void => {
	isDrawerOpen.value = !isDrawerOpen.value
}

const fetchFavorites = async (): Promise<void> => {
	try {
		const { data: favorites } = await axios.get(
			`https://401627320f117569.mokky.dev/favorites`
		)

		items.value = items.value.map((item: ItemsProps) => {
			const favorite = favorites.find(
				(favorite: FavoriteProps) => favorite.parentId === item.id
			)

			if (!favorite) return item

			return {
				...item,
				isFavorite: true,
				favoriteId: favorite.id,
			}
		})
	} catch (e) {
		console.log(e)
	}
}

const fetchItems = async (): Promise<void> => {
	const params = {
		sortBy: filters.sortBy,
		title: `*${filters.searchQuery}*`,
	}

	try {
		const { data } = await axios.get(
			`https://401627320f117569.mokky.dev/items`,
			{
				params,
			}
		)

		items.value = data.map((obj: TItems) => ({
			...obj,
			isFavorite: false,
			isAdded: false,
			favoriteId: null,
		}))
	} catch (e) {
		if (e instanceof AxiosError) {
			console.log(e.message)
		}
	}
}

onMounted(async () => {
	await fetchItems()
	await fetchFavorites()
})
watch(filters, fetchItems)
</script>

<template>
	<Home
		:items
		@sort="(value:string)=> filters.sortBy = value"
		@search="(value:string)=> filters.searchQuery = value.trim()"
		@open="toggleDrawer"
	/>
	<Drawer v-if="isDrawerOpen" @close="toggleDrawer" />
</template>
