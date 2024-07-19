import {createApp} from 'vue'
import router from './router'
import '~/assets/tailwind.postcss'
import '~/assets/style.postcss'
import '~/assets/transition.postcss'
import App from './App.vue'

createApp(App)
  .use(router)
  .mount('#app')
