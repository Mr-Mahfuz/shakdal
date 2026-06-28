import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from './router'
import './style.css'
import App from './App.vue'

import en from './locales/en.json'
import bn from './locales/bn.json'

const i18n = createI18n({
  locale: 'bn', // default locale
  fallbackLocale: 'en',
  messages: { en, bn }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
