/*
 * @Date: 2020-09-30 20:36:45
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-10-19 15:52:01
 */
import { IGeneralObject } from '../../typings/common';
import { Md5 } from 'ts-md5';

export const md5 = Md5;

/** api签名类 */
export class ApiSign {
  private connectSymbol: string;
  private key: string;
  constructor(connectSymbol: string, key: string) {
    this.connectSymbol = connectSymbol;
    this.key = key;
  }

  /**
   * @description: 创建接口的签名，签名会自动过滤没有值的参数
   * @author: JOU(wx: huzhen555)
   * @param {object}  params 需要加密签名的数据对象
   * @return: 签名
   */
  create(params: IGeneralObject<string> = {}) {
    const rawStr = Object.keys(params).sort()
      .map(key => params[key] !== undefined ? `${key}=${params[key]}` : undefined)
      .filter(item => item)
      .join(this.connectSymbol) + this.key;
    return Md5.hashStr(rawStr) as string;
  }
}

/**
 * @description: 构建静态资源路径
 * @author: JOU(wx: huzhen555)
 * @param {'avatar'|'homepage'|'program'|'dishes'|'dishes-category'|'theme'} type 资源路径类型
 * @param {string} path 路径子目录
 * @param {string} fillDir 补充的中间路径段
 * @return {string} 构建好的资源路径
 */
// 静态资源地址
const assetsHost = 'https://static.ycsh6.com';
export function buildAssetsPath(
  type: 'avatar'|'homepage'|'program'|'dishes'|'dishes-category'|'theme', 
  path: string,
  fillDir = ''
) {
  if (path && !/^https?/.test(path)) {
    let pathAry = [assetsHost];
    if (type === 'program') {
      pathAry.push(type);
    }
    if (fillDir) {
      fillDir = fillDir.substr(0, 1) === '/' ? fillDir.substr(1, fillDir.length) : fillDir;
      fillDir = fillDir.substr(-1) === '/' ? fillDir.substr(0, fillDir.length - 1) : fillDir;
      pathAry.push(fillDir);
    }
    path = path.substr(0, 1) === '/' ? path.substr(1, path.length) : path;
    pathAry.push(path);
    path = pathAry.join('/');
  }
  return path;
}