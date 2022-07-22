import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from '@/vant'

import '@/assets/css/reset.less'
import '@/assets/css/base.less'

createApp(App).use(store).use(router).use(vant).mount('#app')
