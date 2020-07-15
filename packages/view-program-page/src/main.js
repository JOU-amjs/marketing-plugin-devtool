/*
 * @Date: 2020-06-02 15:22:39
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 10:41:12
 */ 
import App from './App.vue'
import EL from 'view-program-lib';

window.EL = EL;
const { Vue } = EL.Page();
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#__MARKETING_AD__');