/*
 * @Date: 2019-08-24 15:19:59
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-08-25 13:58:19
 */
import Vue from 'vue';
import App from './App.vue';
import { message } from './util';
import messageModule from './message-module';

Vue.config.productionTip = false;
Object.keys(messageModule).forEach(name => message.on(name, messageModule[name]));

new Vue({
  render: h => h(App),
}).$mount('#app');