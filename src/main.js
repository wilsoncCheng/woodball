import { createApp } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
import App from './App.vue'
import router from './router'
import '@/assets/style/normal.css'
import '@/assets/style/tailwind.css'
import '@/assets/style/output.css'
createApp(App).use(router).use(pinia).mount('#app')
