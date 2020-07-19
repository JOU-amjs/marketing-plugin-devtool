/*
 * @Date: 2020-07-10 09:53:40
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 11:56:39
 */ 
const { paths } = require('../../../config');
const { Router } = require('express');
const { setCors } = require('../common/utils');
const router = Router();

setCors(router);
router.get('/get_online_pages', (_, response) => {
  const pluginConfig = require(paths.pluginFile());
  response.json({
    code: 200,
    data: pluginConfig.onlinePages || [],
  });
});

module.exports = router;