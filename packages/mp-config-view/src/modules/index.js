/*
 * @Date: 2019-07-07 22:50:27
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-06-18 16:58:15
 */
import selectorProd from './preset-prod/selector';
import serviceProd from './preset-prod/service';
import selectorDev from './preset-dev/selector';
import serviceDev from './preset-dev/service';
import { message } from '../common/util';
import * as superInspector from 'super-inspector';

// 增加随机key和移除key的方法
const utils = {
  setRandomKey: list => list.map(item => {
    item.key = 'key' + Math.random() * 100000;
    return item;
  }),
  removeKey: list => list.map(item => {
    delete item.key;
    return item;
  }),
  manageTabs: (tabAry, initTabItem, action, index, randomKey) => {
    if (action === 'add') {
      const tabItem = typeof initTabItem !== 'object' ? initTabItem : { ...initTabItem };
      if (randomKey) {
        tabItem.key = Math.random() * 100000;
      }
      tabAry.push(tabItem);
    }
    else {
      tabAry.splice(index, 1);
    }
  },
  superInspector,
};

// 开发模式下的通信接口
let preset;
if (/devMode=1/.test(window.location.href)) {
  message.init();
  preset = {
    ...selectorDev, 
    ...serviceDev,
    ...utils,
  };
} else {
  preset = {
    ...selectorProd,
    ...serviceProd, 
    ...utils,
  };
}

export default preset;