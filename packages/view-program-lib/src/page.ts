/*
 * @Date: 2020-04-09 14:05:19
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-13 23:00:42
 */
import Vue, { ComponentOptions, PluginObject, PluginFunction } from 'vue';
import VueRouter, { RouterOptions, NavigationGuard, Route } from 'vue-router';
import Vuex, { StoreOptions, Store } from 'vuex';
import { IGeneralObject } from './common/common.inter';
import { request, javaRequest } from './common/network';
import globalData from './model/global-data';
import { setTitle } from './api/mp';
import { message } from './common/message';
import { getMode } from './common/util';

// 对VueRouter的参数进行扩展
interface IRouterOptions extends RouterOptions {
  beforeEach?(guard: NavigationGuard): Function,
  beforeResolve?(guard: NavigationGuard): Function,
  afterEach?(hook: (to: Route, from: Route) => any): Function,
}

export type TNavOptions = {
  path: string,
  routePath?: string,
  query?: IGeneralObject<string|number>,
};
export type TShareMessage = {
  title: string,
  imageUrl?: string,
} & TNavOptions;

// 对Vue的参数进行扩展
type IAnyObject = IGeneralObject<any>;
type TELPlugin = [ PluginObject<any>|PluginFunction<any>, any ];
interface IGlobalConfig {
  routers?: IRouterOptions,
  stores?: StoreOptions<IAnyObject>,
  plugins?: TELPlugin[],
  title: string|(() => string|Promise<string>),
  shareMessage?: TShareMessage,
}

let routerHookNames: ('beforeEach'|'beforeResolve'|'afterEach')[] = ['beforeEach', 'beforeResolve', 'afterEach'];
export default function Page (options: ComponentOptions<Vue> = {}, globalConfig: IGlobalConfig = { title: '' }) {
  if (Object.keys(options).length <= 0) {
    return { Vue, VueRouter, Vuex, request, javaRequest };
  }
  
  // 如果routers是对象，则创建VueRouter
  let router: VueRouter|undefined = undefined, { routers, stores, plugins, shareMessage, title } = globalConfig;
  if (typeof routers === 'object' && Array.isArray(routers.routes) && routers.routes.length > 0) {
    Vue.use(VueRouter);
    router = new VueRouter(routers);
    
    // 如果注册了全局钩子函数则绑定它们
    routerHookNames.forEach((hookName) => {
      if (routers && router && typeof routers[hookName] === 'function') {
        router[hookName](routers[hookName] as any);
      }
    });
  }

  // 如果stores是对象，则创建Vuex.Store对象
  let store: Store<IAnyObject>|undefined = undefined;
  if (typeof stores === 'object' && Object.keys(stores).length > 0) {
    Vue.use(Vuex);
    store = new Vuex.Store(stores);
  }

  // 如果有插件则注册到Vue里面
  if (Array.isArray(plugins) && plugins.length > 0) {
    plugins.forEach(([ pluginInstance, arg ]) => {
      Vue.use(pluginInstance, arg);
    });
  }
  
  // 将小程序的初始化参数传递给小程序
  // 相同插件的初始化数据一定是相同的，所以这边使用pluginId作为key
  let mpInitData = { shareMessage };
  globalData.set('mpInitData', mpInitData);
  if (getMode() === 'plugin-dev') {
    message.init(window.parent);
    message.on('configData', configData => {
      globalData.set('shopConfiguration', configData);
      console.log('%c 接收提示', 'background:green;color:white', '插件视图(线上)已收到配置数据更改通知');
    });
  }
  else {
    request, javaRequest.post('/user/interact/save', {
      key: globalData.get<string>('pluginId'),
      value: mpInitData,
    });
  }

  // 设置标题
  if (typeof title === 'string') {
    setTitle(title);
  }
  else if (typeof title === 'function') {
    let callRes = title();
    if (typeof callRes === 'string') {
      setTitle(callRes);
    }
    else if (callRes instanceof Promise) {
      callRes.then(res => {
        if (typeof res === 'string') {
          setTitle(res);
        }
      });
    }
  }
  
  new Vue({
    router,
    store,
    render: h => h(options),
  }).$mount('#app');
}