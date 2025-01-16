<script lang="ts" setup>
import Card from './Card.vue'
</script>

<template>
	<div class="grid grid-cols-4 gap-5">
		<Card
			title="Мужские Кроссовки Nike Blazer Mid Suede"
			img="/sneakers/sneakers-1.jpg"
			:price="1000"
			:isAdded="true"
		/>

		<Card
			title="Мужские Кроссовки Nike Blazer Mid Suede"
			img="/sneakers/sneakers-3.jpg"
			:price="1150"
			:isAdded="false"
		/>

		<Card
			title="Мужские Кроссовки Nike Blazer Mid Suede"
			img="/sneakers/sneakers-6.jpg"
			:price="1250"
			:isAdded="false"
		/>

		<Card
			title="Мужские Кроссовки Nike Blazer Mid Suede"
			img="/sneakers/sneakers-12.jpg"
			:price="1050"
			:isAdded="false"
		/>
	</div>
</template>
