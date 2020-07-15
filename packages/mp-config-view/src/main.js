/*
 * @Date: 2019-08-26 18:20:25
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-05 19:59:46
 */
import Vue from 'vue';
import App from './App.vue';
import * as presetComponent from './components/index';
import presetModule from './modules/index';

// 将预设的组件注册到全局里
Object.keys(presetComponent).forEach(name => {
  Vue.component(name, presetComponent[name]);
}); 
// 将预设的js模块注册到vue对象上
Object.keys(presetModule).forEach(name => {
  Vue.prototype[name] = presetModule[name];
});

// 初始化vue
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
}).$mount('#app');