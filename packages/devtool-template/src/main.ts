/*
 * @Date: 2020-07-07 00:14:57
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 14:45:54
 */ 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';

Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
