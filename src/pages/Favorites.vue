<script lang="ts" setup>
import { onMounted } from 'vue'

import { CardList } from '../components'
import { useFavoritesStore } from '../stores/useFavoritesStore'

const favoritesStore = useFavoritesStore()

onMounted(async () => await favoritesStore.fetchFavorites())
</script>

<template>
	<h1 class="text-3xl font-bold mb-8">Мои закладки</h1>

	<CardList :items="favoritesStore.favorites" :isFavoritePage="true" />
</template>
