<script lang="ts" setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import { RouterView } from 'vue-router'

import type { FiltersProps, ItemsProps, SortBy } from './@types'
import { useItemsStore } from './stores/useItemsStore'

import { Header } from './components'
import Drawer from './components/Drawer.vue'

const itemsStore = useItemsStore()
const cart = ref<ItemsProps[]>([])
const isDrawerOpen = ref<boolean>(false)
const filters = reactive<FiltersProps>({
	sortBy: 'title',
	searchQuery: '',
})

const totalPrice = computed(() =>
	cart.value.map(item => item.price).reduce((prev, next) => prev + next, 0)
)
const vatPrice = computed(() => Math.round(totalPrice.value * 5) / 100)

const toggleDrawer = (): void => {
	isDrawerOpen.value = !isDrawerOpen.value
}

const addToCart = (item: ItemsProps): void => {
	cart.value.push(item)
	item.isAdded = true
}

const removeFromCart = (item: ItemsProps): void => {
	cart.value.splice(cart.value.indexOf(item), 1)
	item.isAdded = false
}

const addOrRemoveFromCart = (item: ItemsProps): void => {
	if (!item.isAdded) {
		addToCart(item)
	} else {
		removeFromCart(item)
	}
}

const sort = (value: SortBy): void => {
	filters.sortBy = value
}

const search = (value: string): void => {
	filters.searchQuery = value.trim()
}

provide('items', { addOrRemoveFromCart, sort, search })
provide('cart', { cart, totalPrice, vatPrice })

onMounted(async () => {
	const localCart = localStorage.getItem('cart')
	cart.value = localCart ? JSON.parse(localCart) : []

	await itemsStore.fetchItems(filters)
	await itemsStore.fetchFavorites()

	itemsStore.items = itemsStore.items.map((item: ItemsProps) => ({
		...item,
		isAdded: cart.value.some(cartItem => cartItem.id === item.id),
	}))
})
watch(filters, itemsStore.fetchItems)
watch(
	cart,
	() => {
		localStorage.setItem('cart', JSON.stringify(cart.value))
	},
	{ deep: true }
)
</script>

<template>
	<Drawer
		v-if="isDrawerOpen"
		@close="toggleDrawer"
		@deleteItem="(item:ItemsProps) => removeFromCart(item)"
	/>

	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
		<Header :totalPrice @openDrawer="toggleDrawer" />

		<div class="p-10">
			<RouterView />
		</div>
	</div>
</template>
