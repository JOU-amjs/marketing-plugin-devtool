/*
 * @Date: 2020-06-02 14:42:16
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-06 20:53:33
 */ 
import createNamespacedDatabase from '../../src/model/namespaced-database';
import expect = require('expect.js');

describe('测试namespaced-database.ts', function () {
  describe('collection.find', function () {
    it('单个值保存成功', async () => {
      let database = createNamespacedDatabase('123');
      try {
        let { db } = await database.user.find({ title: 'name' }).count();
        expect(db.collection).to.equal('user');
        expect(db.find).to.eql([{ title: 'name' }]);
        expect(db.count).to.eql([]);
      } catch (error) {
        console.log(error);
      }
    });
  });
});