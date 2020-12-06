/*
 * @Date: 2020-06-02 15:22:39
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-26 09:34:50
 */ 
import App from './App.vue';
import Error from './Error.vue';
import EL from 'view-program-lib';
import { parseKeyParams } from './common/util';
import { programScriptUrl } from './common/config';
import * as presetComponent from './preset-components';
import * as filters from './common/filters';
import Vant, { Lazyload } from 'vant';
import 'vant/lib/index.css';

window.EL = EL;
const { Vue } = EL.Page();
Vue.config.productionTip = false;

// 将预设的组件注册到全局里
Object.keys(presetComponent).forEach(name => {
  Vue.component(name, presetComponent[name]);
});
// 注册全局过滤器
Object.keys(filters).forEach(name => {
  Vue.filter(name, filters[name]);
});

// 将vant组件作为预设组件库
Vue.use(Vant);
Vue.use(Lazyload);

new Vue({
  render: h => h(App)
}).$mount('#__MARKETING_AD__');

// 开发环境下，当VUE_APP_DEV_CROSS的值为1时表示需要跨库调试，此时才需要请求远程插件代码
if (process.env.NODE_ENV === 'production' || process.env.VUE_APP_DEV_CROSS === '1') {
  // 解析地址，获取关键参数并放到header中
  let keyParams = parseKeyParams(window.location.pathname);
  let scriptNode = document.createElement('script');
  scriptNode.setAttribute('type', 'text/javascript');
  scriptNode.setAttribute('src', programScriptUrl(keyParams));
  scriptNode.addEventListener('error', () => {
    new Vue({
      render: h => h(Error)
    }).$mount('#__MARKETING_AD__');
  });
  document.head.appendChild(scriptNode);
}