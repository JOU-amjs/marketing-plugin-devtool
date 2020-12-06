/*
 * @Date: 2020-10-26 09:32:16
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-26 09:33:24
 */
import { buildAssetsPath } from "ycsh6-helper";

// 补充资源地址
export function assetsPath(value, type, fillDir) {
  return buildAssetsPath(type, value, fillDir);
}