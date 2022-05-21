import { createApp } from 'vue'
import App from './App.vue'
import Maska from 'maska'
import VueAgile from 'vue-agile'

createApp(App).use(Maska).mount('#app')



createApp(App).use(VueAgile)


const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      }
    }
  })
  