/*
 * @Date: 2020-07-10 09:53:40
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-20 18:06:57
 */ 
const { paths } = require('../../../config');
const { Router } = require('express');
const { setCors } = require('../common/utils');
const { writeFileSync } = require('fs');
const { javaHost } = require('../common/config');
const router = Router();
const axios = require('axios').default;


setCors(router);
router.get('/get_devtool_config', (_, response) => {
  const pluginConfig = require(paths.pluginFile());
  response.json({
    code: 200,
    data: {
      pluginID: pluginConfig.pluginID || '',
      onlinePages: pluginConfig.onlinePages || [],
      database: pluginConfig.database || {
        development: {
          collection: [],
        },
        production: {
          collection: [],
        },
      }
    },
  });
});

router.post('/mongo/collections', async (request, response) => {
  const pluginConfig = require(paths.pluginFile());
  const body = request.body;
  const { data } = await axios.post('/mongo/collections', body, {
    baseURL: javaHost,
    headers: {
      'Content-Type': 'application/json;charset=utf-8;',
      'x-access-token': request.headers['x-access-token'],
  } });
  if (data.code === 200) {
    let env = ['', 'development', 'production'][body.env];
    pluginConfig.database[env].collection.push(...body.name);
    writeFileSync(paths.pluginFile(), JSON.stringify(pluginConfig, null, '\t'));
  }
  response.json(data);
});

router.delete('/mongo/collections', async (request, response) => {
  const pluginConfig = require(paths.pluginFile());
  const body = request.body;
  let data = {};
  try {
    const res = await axios.delete('/mongo/collections', {
      data: body,
      baseURL: javaHost,
      headers: {
        'Content-Type': 'application/json;charset=utf-8;',
        'x-access-token': request.headers['x-access-token'],
      }
    });
    data = res.data;
    if (data.code === 200) {
      let env = ['', 'development', 'production'][body.env];
      let envCollection = pluginConfig.database[env].collection;
      (body.name || []).forEach(nameItem => {
        let index = envCollection.findIndex(collName => collName === nameItem);
        if (index >= 0) {
          envCollection.splice(index, 1);
        }
      });
      writeFileSync(paths.pluginFile(), JSON.stringify(pluginConfig, null, '\t'));
    }
  } catch (error) {
    console.log(error);
    data = {
      code: 500,
      msg: 'server error',
    };
  }
  response.json(data);
});

module.exports = router;