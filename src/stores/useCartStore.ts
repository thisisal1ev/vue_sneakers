import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { ItemsProps } from '../@types'

export const useCartStore = defineStore('cart', () => {
	const cart = ref<ItemsProps[]>([])
	const cartIsEmpty = computed(() => cart.value.length <= 0)
	const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
	const vatPrice = computed(() => Math.round(totalPrice.value * 5) / 100)

	function addToCart(item: ItemsProps): void {
		cart.value.push(item)
		item.isAdded = true
	}

	function removeFromCart(item: ItemsProps): void {
		cart.value.splice(cart.value.indexOf(item), 1)
		item.isAdded = false
	}

	function addOrRemoveFromCart(item: ItemsProps): void {
		if (!item.isAdded) {
			addToCart(item)
		} else {
			removeFromCart(item)
		}
	}

	return { cart, totalPrice, vatPrice, cartIsEmpty, addOrRemoveFromCart, addToCart, removeFromCart }
})