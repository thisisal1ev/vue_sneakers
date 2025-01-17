<script lang="ts" setup>
import type { TItems } from '../items.data'
import Card from './Card.vue'

interface Props {
	items: TItems[]
}

defineProps<Props>()
</script>

<template>
	<div class="grid grid-cols-4 gap-5">
		<Card
			v-for="item in items"
			:key="item.id"
			:title="item.title"
			:img="item.imageUrl"
			:price="item.price"
		/>
	</div>
</template>
