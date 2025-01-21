<script lang="ts" setup>
import axios from 'axios'
import { computed, inject, ref, type Ref } from 'vue'

import type { ItemsProps } from '../@types'
import { CartItem, InfoBlock } from './'

defineEmits(['close', 'deleteItem'])
let {
	cart,
	totalPrice,
	vatPrice,
}: {
	cart: Ref<ItemsProps[]>
	totalPrice: Ref<number>
	vatPrice: Ref<number>
} = inject('cart', {
	cart: ref([]),
	totalPrice: ref(0),
	vatPrice: ref(0),
})

const isCreatingOrder = ref<boolean>(false)
const orderId = ref<number | null>(null)
const cartIsEmpty = computed(() => cart.value.length === 0)
const disabledButton = computed(
	() => isCreatingOrder.value || cartIsEmpty.value
)

const createOrder = async (): Promise<void> => {
	try {
		isCreatingOrder.value = true
		const { data } = await axios.post(
			`https://401627320f117569.mokky.dev/orders`,
			{
				items: cart.value,
				totalPrice: totalPrice.value,
			}
		)

		cart.value = []
		orderId.value = data.id
		return data
	} catch (e) {
		console.log(e)
	} finally {
		isCreatingOrder.value = false
	}
}
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
					@click="() => createOrder()"
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
			v-if="!totalPrice && orderId"
			:imageUrl="'/success.png'"
			:title="'Заказ оформлен'"
			:description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
		/>

		<InfoBlock
			v-else
			:imageUrl="'/empty-box.png'"
			:title="'Корзина пуста'"
			:description="'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'"
		/>

		<button
			@click="$emit('close')"
			class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
		>
			<img src="/icons/arrow-left.svg" alt="Arrow" />
			Вернуться назад
		</button>
	</div>
</template>
