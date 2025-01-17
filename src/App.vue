<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import axios, { AxiosError } from 'axios'
import type { TItems } from './items.data'

import Home from './pages/Home.vue'

interface FiltersProps {
	sortBy: string
	searchQuery: string
}

const items = ref<TItems[]>([])
const filters = reactive<FiltersProps>({
	sortBy: 'title',
	searchQuery: '',
})

const fetchItems = async () => {
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
		items.value = data
	} catch (e) {
		if (e instanceof AxiosError) {
			console.log(e.message)
		}
	}
}

onMounted(fetchItems)

watch(filters, fetchItems)
</script>

<template>
	<Home
		:items
		@sort="(value:string)=> filters.sortBy = value"
		@search="(value:string)=> filters.searchQuery = value.trim()"
	/>
</template>
