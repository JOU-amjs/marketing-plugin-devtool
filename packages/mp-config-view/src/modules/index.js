/*
 * @Date: 2019-07-07 22:50:27
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-18 09:32:29
 */
import selectorProd from './preset-prod/selector';
import serviceProd from './preset-prod/service';
import selectorDev from './preset-dev/selector';
import serviceDev from './preset-dev/service';
import { message } from '../common/util';
import * as superInspector from 'super-inspector';

// 增加随机key和移除key的方法
const utils = {
  /**
   * @description: 为配置列表数据设置随机key，这个key可在`v-for`循环渲染配置项时作为`key`使用
   * @author: JOU(wx: huzhen555)
   * @param {array} list 配置列表数据数组
   * @return {array} 增加了随机key的数据列表
   */
  setRandomKey: list => list.map(item => {
    item.key = 'key' + Math.random() * 100000;
    return item;
  }),

  /**
   * @description: 删除通过`setRandomKey`设置的key
   * @author: JOU(wx: huzhen555)
   * @param {array} list 配置列表数据数组
   * @return {array} 删除了随机key的数据列表
   */
  removeKey: list => list.map(item => {
    delete item.key;
    return item;
  }),

  /**
   * @description: 辅助函数，可通过此方法方便管理多个配置列表卡片的增删
   * @author: JOU(wx: huzhen555)
   * @param {array} tabAry 原配置列表卡片数据数据
   * @param {object} initTabItem 增加配置列表时有效，配置项对象，内包含无内容的字段属性
   * @param {'add'|'remove'} action 配置列表卡片操作行为，值为`add`或`remove`
   * @param {number} index 删除配置列表时有效，删除的下标
   */
  manageTabs: (tabAry, initTabItem, action, index) => {
    if (action === 'add') {
      const tabItem = typeof initTabItem !== 'object' ? initTabItem : { ...initTabItem };
      tabItem.key = Math.random() * 100000;
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
if (/devMode=1/.test(window.location.href) || process.env.NODE_ENV === 'development') {
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