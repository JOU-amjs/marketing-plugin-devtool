/*
 * @Date: 2020-07-14 11:40:48
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-15 12:39:43
 */ 
const { writeFileSync } = require('fs');
const { paths } = require('../../../config');
const { Router } = require('express');
const { readConfigData } = require('../common/utils');
const router = Router();

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
    let parsedData = JSON.parse(req.body.configData);
    writeFileSync(paths.mockConfigData, JSON.stringify(parsedData, null, '\t'));
  }
  res.end(JSON.stringify({
    code: 200,
    data: null,
  }));
});


module.exports = router;