/*
 * @Date: 2020-07-16 10:32:45
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-22 13:11:14
 */
const versionNameMap = ['保持原版本', '增加修订版本号', '增加此版本号', '增加主版本号'];
exports.selectVersionStrategy = function(version) {
  let versionAry = version.split('.').map(vItem => Number(vItem.replace(/-.*$/, '')));
  let newVersions = new Array(versionNameMap.length);
  for (let i = 0; i < newVersions.length; i++) {
    let versionClone = [...versionAry];
    if (i === 0) versionClone = [version];
    else if (i === 1) versionClone[2] += 1;
    else if (i === 2) versionClone = [versionClone[0], versionClone[1] + 1, 0];
    else if (i === 3) versionClone = [versionClone[0] + 1, 0, 0];
    newVersions[i] = versionClone.join('.');
  }
  return [{
    type: 'list',
    name: 'version',
    message: '请选择版本号增加策略',
    choices: versionNameMap.map((nameItem, i) => nameItem + `(${newVersions[i]})`).concat(['手动输入']),
    filter(input) {
      let matches = input.match(/\((.*?)\)/);
      return (matches || ['', ''])[1];
    },
  }];
};

exports.inputVersion = [
  {
    type: 'input',
    message: '请输入版本号',
    name: 'version',
    validate(input) {
      let versionAry = input.split('.');
      let regNumber = /[0-9]+/;
      return versionAry.length === 3 && regNumber.test(versionAry[0]) && regNumber.test(versionAry[1]) || '请按[Major].[Minor].[Patch]格式填写版本号';
    }
  }
]