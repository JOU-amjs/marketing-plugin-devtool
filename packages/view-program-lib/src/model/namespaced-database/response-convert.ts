/*
 * @Date: 2020-07-21 16:09:14
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-21 16:35:01
 */

/**
 * @description: 对mongodb的返回数据项进行转换处理
 * @author: JOU(wx: huzhen555)
 * @param {any} mongoData mongodb接口调用后返回的数据
 * @return {any} 转换处理后的数据
 */
export default function(mongoData: any) {
  if (Array.isArray(mongoData)) {
    mongoData = mongoData.map((dataItem: any) => {
      if (typeof dataItem === 'string') {
        dataItem = JSON.parse(dataItem, (key: string, value: any) => {
          if (key === '') {
            return value;   // 当最后一次时遍历时，key为空，value为解析后的全部数据，此时原样返回
          }

          if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z$/.test(value)) {
            // 如果数据是ISODate格式，则转换为Date对象
            value = new Date(value);
          }
          else if (typeof value === 'object' && Object.keys(value).length === 1 && value.$oid) {
            // 如果数据是ObjectID格式，则只保留$oid字符串
            value = value.$oid;
          }
          return value;
        });
      }
      return dataItem;
    });
  }

  return mongoData;
}