/*
 * @Date: 2020-04-09 16:14:08
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-13 11:03:07
 */
import {
  navigateTo, 
  navigateBack, 
  parseUrlParams,
  buildPath,
  getMode,
  getMPPath
} from '../common/util';
import { message } from '../common/message';
import { TShareMessage, TNavOptions } from '../page';


/**
 * @description: 基于小程序的页面跳转
 * @author: JOU(wx: huzhen555)
 * @param {TNavOptions}  options 跳转路径的参数对象
 */
export function mpNavigateTo({ path, routePath, query }: TNavOptions) {
  return navigateTo(getMPPath(path, routePath, query));
}

/**
 * @description: 基于小程序的页面返回
 * @author: JOU(wx: huzhen555)
 * @param {number} delta 返回页数 
 * @return: 
 */
export async function mpNavigateBack(delta: number) {
  return navigateBack(delta);
}

/**
 * @description: 设置标题
 * @author: JOU(wx: huzhen555)
 * @param {string} title 标题
 */
export function setTitle(title: string) {
  if (!title) {
    return;
  }
  
  document.title = title;
  if (getMode() === 'plugin-dev') {
    message.emit('titleChanged', title);
  }
}

/**
 * @description: 更新分享消息
 * @author: JOU(wx: huzhen555)
 * @param {TNavOptions} shareOptions 分享的内容
 */
export function updateShareMessage(shareOptions: TShareMessage) {
  let matches = (location.hash.match(/^(.*?)(\?.*)?$/) || ['', '', '']);
  let params = parseUrlParams(matches[2]);
  params.shareMessage = encodeURIComponent(JSON.stringify(shareOptions));
  let newHash = buildPath(matches[1], params);
  window.history.replaceState(null, '', newHash);
}