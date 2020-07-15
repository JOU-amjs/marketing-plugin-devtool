/*
 * @Date: 2019-12-05 09:47:51
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2019-12-05 17:20:08
 */

const 
  fs = require('fs'),
  url = require('url'),
  path = require('path');

// api列表，key为pathname，value为函数或对象(对象包含method,callback)
// value为函数时默认为get请求
module.exports = {
  '/v1/get_mp_config_component': (req, res, currentDev) => {
    const 
      configValueFile = path.resolve(__dirname, `../mock/${currentDev}.json`),   // 会读取mock下对应名称的json数据当做模拟数据
      componentCompiledFile = path.resolve(__dirname, '../dist/configure-view.js');
    let configValue, componentStr;
    try {
      if (fs.existsSync(configValueFile)) {
        configValue = JSON.parse(fs.readFileSync(configValueFile, 'utf-8'));
      }
      componentStr = fs.readFileSync(componentCompiledFile, 'utf-8');
    }
    catch (e) {
      console.error(e);
      // throw Error(`no such file\`${configValueFile}\` or json format incorrect`);
    }

    res.end(JSON.stringify({
      code: 200,
      data: {
        config: configValue,
        componentStr,
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