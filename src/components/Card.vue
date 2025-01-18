<script lang="ts" setup>
interface Props {
	title: string
	img: string
	price: number
	isAdded?: boolean
	isFavorite?: boolean
}

defineProps<Props>()
defineEmits(['onClickAddToFavorites', 'onClickAddToCart'])
</script>

<template>
	<div
		class="relative flex flex-col w-full border border-slate-100 rounded-xl p-8 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
	>
		<button
			@click="$emit('onClickAddToFavorites')"
			class="absolute top-8 left-8"
		>
			<img
				:src="isFavorite ? '/icons/like-2.svg' : '/icons/like-1.svg'"
				alt="Favorite"
			/>
		</button>

		<img
			width="220"
			height="220"
			:src="img"
			class="w-full h-56"
			alt="Sneaker"
		/>

		<p>{{ title }}</p>

		<div class="flex items-end justify-between grow mt-5">
			<div class="flex flex-col gap-2">
				<span class="text-slate-200">Цена:</span>
				<span class="font-bold">{{ price }} руб.</span>
			</div>

			<button @click="$emit('onClickAddToCart')">
				<img
					:src="isAdded ? '/icons/checked.svg' : '/icons/plus.svg'"
					width="32"
					height="32"
					alt="Plus"
				/>
			</button>
		</div>
	</div>
</template>
