/*
 * @Date: 2020-04-09 18:49:11
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-04-20 11:02:02
 */

type TStorageTag = 'localStorage'|'sessionStorage';

const structKey = (namespace: string, key: string) => namespace + key.toString();
const STORAGE_KEYS_SUFFIX = '__$$namespaced_storage_keys$$__'; // 此key用于保存当前命名空间下所保存的key列表
const getGlobalThisInfo = (storageTag: TStorageTag) => {
  let { globalThis, namespace } = storages[storageTag];
  let keysStoreKey = structKey(namespace, STORAGE_KEYS_SUFFIX);
  return {
    storage: globalThis,
    keysStoreKey,
    namespace,
    keys: JSON.parse(globalThis.getItem(keysStoreKey) || '[]') as string[],
  };
}

/** 常量导出 */
export const LOCAL_STORAGE: TStorageTag = 'localStorage';
export const SESSION_STORAGE: TStorageTag = 'sessionStorage';

// 为区分多个ViewProgram的本地缓存，使用带有命名空间的localStorage或sessionStorage
// 为了不让namespace泄露出去，将此存放在内部
const storages = {
  [LOCAL_STORAGE]: {
    globalThis: window.localStorage,
    namespace: '',
  },
  [SESSION_STORAGE]: {
    globalThis: window.sessionStorage,
    namespace: '',
  },
};

// NamespacedStorage类
export default class NamespacedStorage {
  private storageTag: TStorageTag;
  public length: number;
  constructor(namespace: string, storageTag: TStorageTag) {
    storages[storageTag].namespace = namespace;
    this.storageTag = storageTag;

    // 初始化length
    let { keys } = getGlobalThisInfo(storageTag);
    this.length = keys.length;
  }
  setItem(key: string, value: string) {
    // 将key保存到keys中
    let { storage, keys, keysStoreKey, namespace } = getGlobalThisInfo(this.storageTag);
    let index = keys.indexOf(key);
    if (keys.length > 0 && index >= 0) {
      keys[index] = key;
    } else {
      keys.push(key);
    }
    this.length = keys.length;
    storage.setItem(keysStoreKey, JSON.stringify(keys));
    
    // 将实际值存储到storage中
    return storage.setItem(structKey(namespace, key), value);
  }
  getItem(key: string) {
    let { storage, namespace } = getGlobalThisInfo(this.storageTag);
    return storage.getItem(structKey(namespace, key));
  }
  removeItem(key: string) {
    // 将key在对应keys中移除
    let { storage, keys, keysStoreKey, namespace } = getGlobalThisInfo(this.storageTag);
    let index = keys.indexOf(key);
    if (keys.length > 0 && index >= 0) {
      keys.splice(index, 1);
    }
    this.length = keys.length;
    storage.setItem(keysStoreKey, JSON.stringify(keys));

    return storage.removeItem(structKey(namespace, key));
  }
  clear() {
    let { storage, keys, keysStoreKey, namespace } = getGlobalThisInfo(this.storageTag);
    if (keys.length > 0) {
      keys.forEach(key => storage.removeItem(structKey(namespace, key)));
    }
    this.length = 0;
    storage.removeItem(keysStoreKey);
  }
  key(index: number) {
    let key: string|null = null;
    let { keys, namespace } = getGlobalThisInfo(this.storageTag);
    let namespacedKey = keys[index];
    if (typeof namespacedKey === 'string') {
      key = namespacedKey.replace(namespace, '');
    }
    return key;
  }
}