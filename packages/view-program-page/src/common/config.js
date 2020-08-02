/*
 * @Date: 2020-07-23 12:26:45
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-02 14:19:13
 */ 
const scriptHost = 'https://static.ycsh6.com';
// 根据模式返回对应数据
function getModeValue(modeOption) {
  let mode = /devMode=1/.test(window.location.hash) ? 'pluginDev' : 'prod';
  return modeOption[mode] || '';
}

export const programScriptUrl = getModeValue({
  pluginDev: ({ page }) => `/${page}.js`,
  prod: ({ pluginId, page }) => `${scriptHost}/program/${pluginId}/online/${page}.js`,
});