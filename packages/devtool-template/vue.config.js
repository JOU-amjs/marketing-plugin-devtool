/*
 * @Date: 2020-07-07 19:37:47
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 11:39:05
 */ 
const path = require('path');
const bodyParser = require('body-parser');

module.exports = {
  lintOnSave: false,
  outputDir: '../../dist-program-views/devtool-template',

  chainWebpack: config => {
    // 自动注入通用的scss，不需要自己在每个文件里手动注入
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => {
      config.module.rule('scss').oneOf(type)
      .use('sass-resource')
      .loader('sass-resources-loader')
      .options({
        resources: [
          path.resolve(__dirname, './src/assets/styles/global.scss'),
        ],
      });
    });
  },
  devServer: {
    before(app) {
      app.use(bodyParser.json());
      app.get('/get_online_pages', (_, response) => {
        response.json({
          code: 200,
          data: [
            { path: 'index' },
            { path: 'rank' }
          ],
        });
      });

      app.get('/mock/get_config_data', (_, response) => {
        response.json({
          code: 200,
          data: {
            testString: 'this is a test data',
            mockAry: [
              'mock 1',
              'mock 2',
              'mock 3',
            ]
          },
        });
      });
      
      app.post('/mock/save_config_data', (_, response) => {
        response.json({
          code: 200,
          data: null,
        });
      });
    }
  }
};