/*
 * @Date: 2020-06-02 14:42:16
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-26 14:35:20
 */ 
import createNamespacedDatabase from '../src/namespaced-database';
import expect = require('expect.js');

describe('测试namespaced-database.ts', function () {
  describe('collection.find', function () {
    it('单个值保存成功', async () => {
      let database = createNamespacedDatabase(async proxyObject => proxyObject);
      try {
        let db = await database.user.find({ title: 'name' }).count();
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
      let database = createNamespacedDatabase(async proxyObject => proxyObject);
      try {
        let db = await database.user.sync().update({
          title: 'name'
        });
        expect(db.collection).to.equal('user');
        expect(db.sync).to.equal(true);
      } catch (error) {
        console.log(error);
      }

      database = createNamespacedDatabase(async proxyObject => proxyObject);
      expect(() => {
        database.user.update({
          title: 'name'
        }).sync();
      }).to.throwError();
    });
  });
});