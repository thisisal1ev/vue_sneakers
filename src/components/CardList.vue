<script lang="ts" setup>
import type { ItemsProps } from '../@types'
import { Card } from './'

interface Props {
	items: ItemsProps[]
	isFavoritePage?: boolean
}

defineProps<Props>()
defineEmits(['addToFavorites', 'addToCart'])
</script>

<template>
	<div class="grid grid-cols-4 gap-5" v-auto-animate>
		<Card
			v-for="item in items"
			:key="item.id"
			:title="item.title"
			:img="item.imageUrl"
			:price="item.price"
			:isFavorite="item.isFavorite"
			:isAdded="item.isAdded"
			:isFavoritePage="isFavoritePage || false"
			@onClickAddToFavorites="$emit('addToFavorites', item)"
			@onClickAddToCart="$emit('addToCart', item)"
		/>
	</div>
</template>
