const { readFileSync } = require('fs');

/*
 * @Date: 2020-07-13 13:26:25
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-13 14:36:45
 */
const 
  { moduleUrls } = require('../../config'),
  { viewProgramPage } = moduleUrls,
  http =  require('http'),
  buildURL = require('../../utils/buildURL');
 
module.exports = {
  '/online/:page': async (request, response) => {
    const page = request.params.page;

    let pageLayout = readFileSync(`${viewProgramPage.publicPath}/index.html`, { encoding: 'utf-8' });
    pageLayout = pageLayout.replace(/{{\s*app\.bundle\.js\s*}}/g, `/${page}.js`);
    
    // 读取mock下对应名称的json数据当做模拟数据
    // let pageContent = await new Promise(resolve => {
    //   http.get(`${buildURL(viewProgramPage)}/${page}.js`, res => {
    //     let data = '';
    //     res.setEncoding('utf8');
    //     res.on('data', (chunk) => {
    //       data += chunk;
    //     });
    //     res.on('end', () => {
    //       resolve(data);
    //     });
    //   });
    // });

    response.send(pageLayout);
  },
}