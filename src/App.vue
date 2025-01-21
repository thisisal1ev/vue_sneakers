<script lang="ts" setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import axios, { AxiosError } from 'axios'
import { RouterView } from 'vue-router'

import type { TItems } from './items.data'
import type { FavoriteProps, FiltersProps, ItemsProps, SortBy } from './@types'

import Drawer from './components/Drawer.vue'
import { Header } from './components'

const items = ref<ItemsProps[]>([])
const cart = ref<ItemsProps[]>([])
const isDrawerOpen = ref<boolean>(false)
const isCreatingOrder = ref<boolean>(false)
const filters = reactive<FiltersProps>({
	sortBy: 'title',
	searchQuery: '',
})

const totalPrice = computed(() =>
	cart.value.map(item => item.price).reduce((prev, next) => prev + next, 0)
)
const vatPrice = computed(() => Math.round(totalPrice.value * 5) / 100)
const cartIsEmpty = computed(() => cart.value.length === 0)
const disabledButton = computed(
	() => isCreatingOrder.value || cartIsEmpty.value
)

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
		return data
	} catch (e) {
		console.log(e)
	} finally {
		isCreatingOrder.value = false
	}
}

const fetchFavorites = async (): Promise<void> => {
	try {
		const { data: favorites } = await axios.get(
			`https://401627320f117569.mokky.dev/favorites`
		)

		items.value = items.value.map((item: ItemsProps) => {
			const favorite = favorites.find(
				(favorite: FavoriteProps) => favorite.parentId === item.id
			)

			if (!favorite) return item

			return {
				...item,
				isFavorite: true,
				favoriteId: favorite.id,
			}
		})
	} catch (e) {
		console.log(e)
	}
}

const fetchItems = async (): Promise<void> => {
	const params = {
		sortBy: filters.sortBy,
		title: `*${filters.searchQuery}*`,
	}

	try {
		const { data } = await axios.get(
			`https://401627320f117569.mokky.dev/items`,
			{
				params,
			}
		)

		items.value = data.map((obj: TItems) => ({
			...obj,
			isFavorite: false,
			isAdded: false,
			favoriteId: null,
		}))
	} catch (e) {
		if (e instanceof AxiosError) {
			console.log(e.message)
		}
	}
}

const sort = (value: SortBy): void => {
	filters.sortBy = value
}

const search = (value: string): void => {
	filters.searchQuery = value.trim()
}

provide('cart', { items, addOrRemoveFromCart, sort, search })

onMounted(async () => {
	const localCart = localStorage.getItem('cart')
	cart.value = localCart ? JSON.parse(localCart) : []

	await fetchItems()
	await fetchFavorites()

	items.value = items.value.map((item: ItemsProps) => ({
		...item,
		isAdded: cart.value.some(cartItem => cartItem.id === item.id),
	}))
})
watch(filters, fetchItems)
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
		:cart
		:vatPrice
		:totalPrice
		:disabledButton
		@close="toggleDrawer"
		@deleteItem="(item:ItemsProps) => removeFromCart(item)"
		@createOrder="createOrder"
	/>

	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
		<Header :totalPrice @openDrawer="toggleDrawer" />

		<div class="p-10">
			<RouterView />
		</div>
	</div>
</template>
