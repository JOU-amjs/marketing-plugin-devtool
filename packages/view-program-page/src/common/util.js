/*
 * @Date: 2020-07-23 12:23:34
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-07 15:34:35
 */ 

/**
 * @description: 解析出pluginId、activityId、shopId、page等关键数据
 * @author: JOU(wx: huzhen555)
 * @param {string} 待解析的pathname(相对路径)
 * @return 包含pluginId、activityId、shopId、page的数据对象
 */
export function parseKeyParams(pathname) {
  const keyParams = {
    pluginId: '',
    activityId: '',
    shopId: '',
    page: '',
  }
  pathname = pathname.substr(0, 1) === '/' ? pathname.substr(1) : pathname;
  let pathDataAry = pathname.split('/');
  let onlineStrIndex = pathDataAry.indexOf('online');
  if (onlineStrIndex <= -1) {
    throw new Error(`current url is not a online program's url`);
  }
  keyParams.page = pathDataAry[onlineStrIndex + 1] || 'index';  // page为空时默认为index
  pathDataAry = pathDataAry.slice(0, onlineStrIndex);
  keyParams.pluginId = pathDataAry[0] || '';
  keyParams.activityId = pathDataAry[1] || '';
  keyParams.shopId = pathDataAry[2] || '';
  return keyParams;
}