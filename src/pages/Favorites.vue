<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import type { FavoritesProps, ItemsProps } from '../@types'
import { CardList } from '../components'

const favorites = ref<ItemsProps[]>([])

const fetchFavorites = async () => {
	try {
		const { data } = await axios.get(
			'https://401627320f117569.mokky.dev/favorites?_relations=items'
		)

		favorites.value = data.map((item: FavoritesProps) => item.item)
	} catch (e) {
		console.error(e)
	}
}

onMounted(async () => await fetchFavorites())
</script>

<template>
	<h1 class="text-3xl font-bold mb-8">Мои закладки</h1>

	<CardList :items="favorites" :isFavoritePage="true" />
</template>
