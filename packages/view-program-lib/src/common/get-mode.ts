/*
 * @Date: 2020-08-25 10:30:24
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-25 10:34:18
 */

/**
 * @description: 获取模式，意思是在正式环境下运行的，还是在插件开发环境下运行的
 * 为了避免在打包时循环引用，将此方法独立出来
 * @author: JOU(wx: huzhen555)
 * @return {string} 正式环境下运行返回`prod`，插件开发环境下运行返回`plugin-dev`;
 */
export default function getMode() {
  let href = '';
  // 兼容单元测试
  try {
    href = window.location.href;
  } catch (error) {
    href = '';
  }
  if (/devMode=1/.test(href)) {
    return 'plugin-dev';
  }
  else if (/devMode=2/.test(href)) {
    return 'debug';
  }
  return 'prod';
}