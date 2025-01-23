import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './routes'
import './style.css'

createApp(App).use(router).use(createPinia()).use(autoAnimatePlugin).mount('#app')