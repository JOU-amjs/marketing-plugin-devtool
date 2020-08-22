/*
 * @Date: 2020-06-02 14:42:16
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-21 16:22:19
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

  describe('mongodb同步操作', function () {
    it('sync函数必须在集合名后面被调用', async () => {
      let database = createNamespacedDatabase('123');
      try {
        let { db } = await database.user.sync().update({
          title: 'name'
        });
        expect(db.collection).to.equal('user');
        expect(db.sync).to.equal(true);
      } catch (error) {
        console.log(error);
      }

      database = createNamespacedDatabase('345');
      expect(() => {
        database.user.update({
          title: 'name'
        }).sync();
      }).to.throwError();
    });
  });
});