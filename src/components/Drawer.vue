<script lang="ts" setup>
import type { ItemsProps } from '../@types'

import CartItem from './CartItem.vue'
import InfoBlock from './InfoBlock.vue'

interface Props {
	cart: ItemsProps[]
	vatPrice: number
	totalPrice: number
	disabledButton: boolean
}

defineProps<Props>()
defineEmits(['close', 'deleteItem', 'createOrder'])
</script>

<template>
	<div
		@click="$emit('close')"
		class="fixed z-10 top-0 h-full w-full bg-black opacity-70"
	/>

	<div
		v-if="cart.length"
		class="flex flex-col justify-between fixed z-10 top-0 h-full right-0 w-1/4 bg-white px-8 py-5"
	>
		<h2 class="text-2xl font-bold mb-10 flex items-center gap-5">
			<button @click="$emit('close')">
				<svg
					class="rotate-180 hover:-translate-x-1 opacity-30 hover:opacity-100 transition cursor-pointer"
					width="16"
					height="14"
					viewBox="0 0 16 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 7H14.7143"
						stroke="black"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M8.71436 1L14.7144 7L8.71436 13"
						stroke="black"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			Корзина
		</h2>

		<div class="flex flex-col flex-1 justify-between">
			<div class="flex flex-col gap-5">
				<CartItem
					v-if="cart.length"
					v-for="item in cart"
					:title="item.title"
					:price="item.price"
					:img="item.imageUrl"
					@onClickDelete="$emit('deleteItem', item)"
				/>
			</div>

			<div>
				<div class="flex flex-col gap-5">
					<div class="flex items-end gap-2">
						<span>Итого:</span>
						<div class="flex-1 border-b border-dashed" />
						<span class="font-bold">{{ totalPrice + vatPrice }} &#8381;</span>
					</div>

					<div class="flex items-end gap-2">
						<span>Налог 5%:</span>
						<div class="flex-1 border-b border-dashed" />
						<span class="font-bold">{{ vatPrice }} &#8381;</span>
					</div>
				</div>

				<button
					@click="$emit('createOrder')"
					:disabled="disabledButton"
					class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					Оформить заказ
					<img src="/icons/arrow-next.svg" alt="Arrow" />
				</button>
			</div>
		</div>
	</div>

	<div
		v-else
		class="flex flex-col justify-center fixed z-10 top-0 h-full right-0 w-1/4 bg-white px-8 py-5"
	>
		<InfoBlock
			:imageUrl="'/empty-box.png'"
			:title="'Корзина пуста'"
			:description="'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'"
		/>
	</div>
</template>
