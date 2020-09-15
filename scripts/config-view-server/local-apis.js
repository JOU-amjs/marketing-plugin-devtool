/*
 * @Date: 2019-12-05 09:47:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-24 20:58:01
 */
const 
  { paths, moduleUrls } = require('../../config'),
  configViewUrl = moduleUrls.mpConfigView,
  fs = require('fs'),
  url = require('url'),
  { buildURL } = require('../../common/util'),
  axios = require('axios').default;

// api列表，key为pathname，value为函数或对象(对象包含method,callback)
// value为函数时默认为get请求
module.exports = {
  '/v1/get_mp_config_component': async (_, res) => {
    let configValue;
    // 读取mock下对应名称的json数据当做模拟数据
    let { data } = await axios.get(`${buildURL(configViewUrl)}/index.js`);
    if (fs.existsSync(paths.mockConfigData())) {
      let configData = fs.readFileSync(paths.mockConfigData()).toString() || '{}';
      configValue = JSON.parse(configData);
    }
    
    res.end(JSON.stringify({
      code: 200,
      data: {
        config: configValue,
        componentStr: data || '',
      },
    }));
  },

  // 模拟请求示例菜品数据
  '/v1/get_shop_dishes': (req, res) => {
    const 
      { query } = url.parse(req.url, true),
      dishesObj = require(paths.scaffoldingMock.dishes());
    let resData = dishesObj;
    if (query.dishIds) {
      resData = query.dishIds.split(/,|，/).map(dishId => dishesObj[dishId]).filter(item => item);
    }
    res.end(JSON.stringify({
      code: 200,
      data: resData,
    }));
  },

  // 模拟请求示例菜品分类数据
  '/v1/get_shop_dish_categories': (req, res) => {
    const 
      { query } = url.parse(req.url, true),
      catiesObj = require(paths.scaffoldingMock.category());
    let resData = catiesObj;
    if (query.catIds) {
      resData = query.catIds.split(',').map(catId => catiesObj[catId]).filter(item => item);
    }
    res.end(JSON.stringify({
      code: 200,
      data: resData,
    }));
  },

  '/v1/get_shop_coupon_groups': (req, res) => {
    const 
      { query } = url.parse(req.url, true),
      couponObj = require(paths.scaffoldingMock.couponInfo());
    let resData = couponObj;
    if (query.couponGroupIds) {
      resData = query.couponGroupIds.split(',').map(groupId => couponObj[groupId]).filter(item => item);
    }
    res.end(JSON.stringify({
      code: 200,
      data: resData,
    }));
  },
}