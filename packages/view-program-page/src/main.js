/*
 * @Date: 2020-06-02 15:22:39
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-02 14:14:32
 */ 
import App from './App.vue';
import Error from './Error.vue';
import EL from 'view-program-lib';
import { parseKeyParams } from './common/util';
import { programScriptUrl } from './common/config';

window.EL = EL;
const { Vue } = EL.Page();
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#__MARKETING_AD__');

// 解析地址，获取关键参数并放到header中
let keyParams = parseKeyParams(window.location.pathname);
let scriptNode = document.createElement('script');
scriptNode.setAttribute('type', 'text/javascript');
scriptNode.setAttribute('src', programScriptUrl(keyParams));
scriptNode.addEventListener('error', () => {
  new Vue({
    render: h => h(Error)
  }).$mount('#__MARKETING_AD__');
})
document.head.appendChild(scriptNode);