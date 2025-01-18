<script lang="ts" setup>
import type { ItemsProps } from '../@types'
import Card from './Card.vue'

interface Props {
	items: ItemsProps[]
}

defineProps<Props>()
defineEmits(['addToFavorites'])
</script>

<template>
	<div class="grid grid-cols-4 gap-5">
		<Card
			v-for="item in items"
			:key="item.id"
			:title="item.title"
			:img="item.imageUrl"
			:price="item.price"
			:isFavorite="item.isFavorite"
			@onClickAdd="$emit('addToFavorites', item)"
		/>
	</div>
</template>
