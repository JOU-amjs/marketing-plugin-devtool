/*
 * @Date: 2020-07-14 11:40:48
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-19 11:54:32
 */ 
const { writeFileSync } = require('fs');
const { paths } = require('../../../config');
const { Router } = require('express');
const { readConfigData, setCors } = require('../common/utils');
const router = Router();

setCors(router);
router.get('/get_config_data', (_, res) => {
  let configValue = readConfigData();
  res.json({
    code: 200,
    data: configValue,
  });
});

// 保存配置信息
router.post('/save_config_data', (req, res) => {
  if (req.body.configData) {
    writeFileSync(paths.mockConfigData, JSON.stringify(req.body.configData, null, '\t'));
  }
  res.end(JSON.stringify({
    code: 200,
    data: null,
  }));
});


module.exports = router;