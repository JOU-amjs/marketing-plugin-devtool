/*
 * @Date: 2020-07-18 11:17:41
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-11-09 10:53:59
 */
const compareVersions = require('compare-versions');
const assert = require('assert');

module.exports = {
  assertPluginID(pluginID = '') {
    const pluginIDErrorStr = 'pluginID必须以大写和小写字母、数字以及`_`组成，长度为4-50个字符';
    assert.strict.match(pluginID, /^[\w]{4,50}$/, pluginIDErrorStr);
  },
  assertPluginName(pluginName = '') {
    const pluginNameErrorStr = '插件名必须为中文、英文或数字组成，且不多于12字';
    assert.strict.match(pluginName, /^[A-Za-z0-9\u4e00-\u9fa5]+$/, pluginNameErrorStr);
    assert.ok(pluginName.length <= 12, pluginNameErrorStr);
  },
  assertIntro(intro = '') {
    assert.ok(intro.length <= 20, '插件简介需在20字以内');
  },
  assertDescription(description = '') {
    assert.ok(description.length > 0 && description.length <= 1500, '插件详细介绍需在1500字以内，且不能为空');
  },
  assertVersion(version) {
    assert.ok(compareVersions.validate(version), '请使用<major version>.<minor version>.<build number>[-<release>]命名版本号');
  },
  assertDeveloper({ id, secret }) {
    assert.ok(id && secret, '开发者id和secret不能为空');
  },
  assertIcon(icon = '') {
    assert.ok(!!icon, '营销插件图标为必填参数');
  },
};