import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import './style.css'
import App from './App.vue'
import { router } from './routes'

createApp(App).use(router).use(createPinia()).use(autoAnimatePlugin).mount('#app')