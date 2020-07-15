/*
 * @Date: 2019-08-27 14:47:10
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-04 15:15:17
 */
export default {
	postData(data) {
		console.log('提交数据为:', data);
		console.warn('开发模式下为数据预览，正式环境下会直接提交至服务器');
	},
};