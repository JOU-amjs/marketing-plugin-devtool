const { readFileSync } = require('fs');

/*
 * @Date: 2020-07-13 13:26:25
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-02 13:57:57
 */
const 
  { moduleUrls } = require('../../config'),
  { viewProgramPage } = moduleUrls;

module.exports = {
  '/:pluginId/:activityId/:shopId/online/:page': async (_, response) => {
    let pageLayout = readFileSync(`${viewProgramPage.publicPath}/index.html`, { encoding: 'utf-8' });
    response.send(pageLayout);
  },
}