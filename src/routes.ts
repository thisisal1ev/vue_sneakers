import { createRouter, createWebHistory } from 'vue-router'
import { Favorites, Home } from './pages'

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/favorites', name: 'Favorites', component: Favorites },
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})