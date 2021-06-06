import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'

Vue.prototype.axios = axios;

Vue.component("Scroller", Scroller);
Vue.component("Loading", Loading);

Vue.filter("setWH", (url,arg) =>{
	return url.replace(/w\.h/, arg)
})

Vue.use(ElementUI);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
