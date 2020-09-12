import Vue from 'vue'
import App from './App.vue'
import store from './store'

import './assets/css/common.css'
import router from './router'
//引入全局vant组件
import './plugins/vant'
import './assets/iconfont/iconfont.css'

Vue.use(require('vue-wechat-title'))

Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
