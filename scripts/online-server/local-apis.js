const { readFileSync } = require('fs');

/*
 * @Date: 2020-07-13 13:26:25
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-17 15:27:22
 */
const 
  { moduleUrls } = require('../../config'),
  { viewProgramPage } = moduleUrls;

module.exports = {
  '/online/:page': async (request, response) => {
    const page = request.params.page;
    let pageLayout = readFileSync(`${viewProgramPage.publicPath}/index.html`, { encoding: 'utf-8' });
    pageLayout = pageLayout.replace(/{{\s*app\.bundle\.js\s*}}/g, `/${page}.js`);
    response.send(pageLayout);
  },
}