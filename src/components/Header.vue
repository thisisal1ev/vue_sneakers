<script lang="ts" setup>
interface Props {
	totalPrice: number
}

defineProps<Props>()
defineEmits(['openDrawer'])
</script>

<template>
	<header class="flex justify-between border-b border-slate-200 px-10 py-8">
		<RouterLink to="/" class="flex items-center gap-4">
			<img src="/logo.png" alt="Logo" class="w-11" />
			<div>
				<h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>
				<p class="text-slate-400">Магазин лучших кроссовок</p>
			</div>
		</RouterLink>

		<ul class="flex items-center gap-10">
			<li class="flex items-center gap-3 cursor-pointer">
				<button
					@click="$emit('openDrawer')"
					class="flex items-center gap-3 cursor-pointer"
				>
					<img src="/icons/cart.svg" alt="Cart" />
					<b>{{ totalPrice }} &#8381;</b>
				</button>
			</li>
			<li class="flex items-center gap-3 cursor-pointer">
				<img src="/icons/heart.svg" alt="Favorite" />
				<span>Закладки</span>
			</li>
			<li class="flex items-center gap-3 cursor-pointer">
				<img src="/icons/profile.svg" alt="Favorite" />
				<span>Профиль</span>
			</li>
		</ul>
	</header>
</template>
