/*
 * @Date: 2020-07-13 10:49:28
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-13 10:51:11
 */ 
module.exports = function ({ protocol, host, port }) {
  return `${protocol}://${host}:${port}`;
};