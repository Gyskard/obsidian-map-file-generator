import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { messages } from './utils/language'
import App from './App.vue'
import './styles/dark.scss'
import 'uno.css'

const i18n = createI18n({ locale: 'en', legacy: false, messages })
const pinia = createPinia()
const app = createApp(App)

app.use(i18n)
app.use(pinia)
app.mount('#app')
