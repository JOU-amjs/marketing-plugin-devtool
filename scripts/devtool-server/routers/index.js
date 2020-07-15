/*
 * @Date: 2020-07-10 09:53:40
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 11:40:57
 */ 
const { paths } = require('../../../config');
const { Router } = require('express');
const router = Router();

router.get('/get_online_pages', (_, response) => {
  const pluginConfig = require(paths.pluginFile);
  response.json({
    code: 200,
    data: pluginConfig.onlinePages || [],
  });
});

module.exports = router;