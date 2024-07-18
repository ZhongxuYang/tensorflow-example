import {createApp} from 'vue'
import router from './router'
import './tailwind.postcss'
import './style.postcss'
import App from './App.vue'

createApp(App)
  .use(router)
  .mount('#app')
