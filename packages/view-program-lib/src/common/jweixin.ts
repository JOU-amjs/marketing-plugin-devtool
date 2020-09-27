/*
 * @Date: 2020-04-10 14:00:19
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-22 18:30:40
 */
import { IGeneralObject } from './common.inter';

let gl: Window | IGeneralObject<any>;
try {
  gl = window;
} catch (error) {
  gl = {};
}

const wx = (gl as any).wx;
delete (gl as any).wx;
delete (gl as any).jWeixin;
export default wx;