/*
 * @Date: 2019-12-05 09:47:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 11:37:21
 */
const 
  { paths, moduleUrls } = require('../../config'),
  configViewUrl = moduleUrls.mpConfigView,
  http =  require('http'),
  fs = require('fs'),
  url = require('url'),
  path = require('path'),
  buildURL = require('../../utils/buildURL');

// api列表，key为pathname，value为函数或对象(对象包含method,callback)
// value为函数时默认为get请求
module.exports = {
  '/v1/get_mp_config_component': async (_, res) => {
    let configValue,
    // 读取mock下对应名称的json数据当做模拟数据
    componentStr = await new Promise(resolve => {
      http.get(`${buildURL(configViewUrl)}/config-view.js`, res => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      });
    });
    if (fs.existsSync(paths.mockConfigData)) {
      let configData = fs.readFileSync(paths.mockConfigData).toString() || '{}';
      configValue = JSON.parse(configData);
    }
    
    res.end(JSON.stringify({
      code: 200,
      data: {
        config: configValue,
        componentStr: componentStr || '',
      },
    }));
  },

  // 模拟请求示例菜品数据
  '/v1/get_shop_dishes': (req, res) => {
    const 
      dataFilepath = path.resolve(__dirname, './dishes.demo.json'),
      { query } = url.parse(req.url, true),
      dishesObj = JSON.parse(fs.readFileSync(dataFilepath, 'utf-8'));
    let resData = dishesObj;
    if (query.dishIds) {
      resData = query.dishIds.split(',').map(dishId => dishesObj[dishId]).filter(item => item);
    }
    res.end(JSON.stringify({
      code: 200,
      data: resData,
    }));
  },

  // 模拟请求示例菜品分类数据
  '/v1/get_shop_dish_categories': (req, res) => {
    const 
      dataFilepath = path.resolve(__dirname, './categories.demo.json'),
      { query } = url.parse(req.url, true),
      catiesObj = JSON.parse(fs.readFileSync(dataFilepath, 'utf-8'));
    let resData;
    if (query.catIds) {
      resData = query.catIds.split(',').map(catId => catiesObj[catId]).filter(item => item);
    }
    res.end(JSON.stringify({
      code: 200,
      data: resData,
    }));
  }
}