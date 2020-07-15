/*
 * @Date: 2020-04-10 14:00:19
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-06 20:29:31
 */

let gl: Window | NodeJS.Global;
try {
  gl = window;
} catch (error) {
  gl = global;
}

const wx = (gl as any).wx;
delete (gl as any).wx;
delete (gl as any).jWeixin;
export default wx;