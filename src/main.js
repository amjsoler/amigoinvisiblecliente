import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/lang/index.js'

import App from './App.vue'
import router from './router'
import initSubscribers from '@/stores/initSubscribers.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

//// SUBSCRIBERS PINIA para guardar auto en local storage ////
initSubscribers()

app.mount('#app')
