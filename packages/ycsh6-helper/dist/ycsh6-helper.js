/*!
  * ycsh6-helper 0.3.0 (https://github.com/JOU amjs/aop-js)
  * API https://github.com/JOU amjs/aop-js/blob/master/doc/api.md
  * Copyright 2017-2020 JOU amjs. All Rights Reserved
  * Licensed under MIT (https://github.com/JOU amjs/aop-js/blob/master/LICENSE)
  */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tsMd5 = require('ts-md5');

var errorPrefix = 'assert';
function assert(val, message) {
    if (!val) {
        throw new Error("[" + errorPrefix + "]" + (message || '参数断言失败'));
    }
}
assert.notNull = function (val, message) {
    assert(val !== null && val !== undefined, message || '参数不能为空');
};
assert.match = function (val, reg, message) {
    assert(reg.test(val), message || '参数与指定正则表达式不匹配');
},
    assert.equal = function (val, equalVal, message) {
        assert(val === equalVal, message || '参数与指定参数不相等');
    },
    assert.equalType = function (val, type, message) {
        var typeAry = Array.isArray(type) ? type : [type];
        var equalPass = false;
        for (var i in typeAry) {
            if (typeAry[i] === (val === null || val === void 0 ? void 0 : val.constructor)) {
                equalPass = true;
                break;
            }
        }
        assert(equalPass, message || '参数与指定类型不匹配');
    };

var converterErrors = {
    argsLength: function (fnName, length) {
        return "function " + fnName + " expected 1 arg bug got " + length;
    },
};
var argsConverters = {
    insert: function (val, _) {
        assert(val.length === 1, converterErrors.argsLength('insert', val.length));
        val[0] = Array.isArray(val[0]) ? val[0] : [val[0]];
        return val;
    },
    limit: function (val, _) {
        assert(val.length === 1, converterErrors.argsLength('limit', val.length));
        return val[0];
    },
    skip: function (val, _) {
        assert(val.length === 1, converterErrors.argsLength('skip', val.length));
        return val[0];
    },
    sync: function (_, target) {
        assert(Object.keys(target).length === 1 && target.collection, 'function sync must call after collection name');
        return true;
    },
};

var commonWord = function (name) { return "forbidden call function `" + name + "`"; };
var collectionForbiddenCalledFns = {
    drop: commonWord('drop') + ', instead you can delete collection by editing property `database` in plugin.js',
};
var dbForbiddenCalledFns = {
    dropDatabase: commonWord('dropDatabase'),
    createDatabase: commonWord('createDatabase'),
    createCollection: commonWord('createCollection') + ', collections will create automatically when uploading',
};

function responseConvert (mongoData) {
    if (Array.isArray(mongoData)) {
        return mongoData.map(function (dataItem) {
            if (typeof dataItem === 'string') {
                dataItem = JSON.parse(dataItem, function (key, value) {
                    if (key === '') {
                        return value;
                    }
                    if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]+Z$/.test(value)) {
                        value = new Date(value);
                    }
                    else if (typeof value === 'object' && Object.keys(value).length === 1 && value.$oid) {
                        value = value.$oid;
                    }
                    return value;
                });
            }
            delete dataItem.activityId;
            return dataItem;
        });
    }
    return mongoData;
}

function createProxyedPromise(target, handler, executor) {
    var protoProxy = new Proxy(target, handler);
    Object.setPrototypeOf(Promise.prototype, protoProxy);
    return new Promise(executor);
}
function createCollectionProxy(collectionName, sendRequest) {
    var proxyObject = { collection: collectionName };
    var collectionProxyedPromise = createProxyedPromise(proxyObject, {
        get: function (target, key) {
            var exceptionstring = collectionForbiddenCalledFns[key];
            assert(typeof exceptionstring !== 'string', exceptionstring);
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var convertFn = argsConverters[key] || (function (val, _) { return val; });
                target[key] = convertFn(args, target);
                return collectionProxyedPromise;
            };
        },
    }, function (resolve, reject) {
        setTimeout(function () {
            sendRequest(proxyObject).then(function (resp) {
                if (resp === proxyObject) {
                    resolve(resp);
                    return;
                }
                var data = resp.data;
                if (data.code !== 200) {
                    reject(new Error(data.msg));
                    return;
                }
                resolve(responseConvert(data.data));
            }, function (rej) { return reject(rej); });
        });
    });
    return collectionProxyedPromise;
}
function createNamespacedDatabase(sendRequest) {
    return new Proxy({}, {
        get: function (_, key) {
            var exceptionstring = dbForbiddenCalledFns[key];
            if (typeof exceptionstring === 'string') {
                throw new Error(exceptionstring);
            }
            return createCollectionProxy(key, sendRequest);
        },
    });
}

var md5 = tsMd5.Md5;
var ApiSign = (function () {
    function ApiSign(connectSymbol, key) {
        this.connectSymbol = connectSymbol;
        this.key = key;
    }
    ApiSign.prototype.create = function (params) {
        if (params === void 0) { params = {}; }
        var rawStr = Object.keys(params).sort()
            .map(function (key) { return params[key] !== undefined ? key + "=" + params[key] : undefined; })
            .filter(function (item) { return item; })
            .join(this.connectSymbol) + this.key;
        return tsMd5.Md5.hashStr(rawStr);
    };
    return ApiSign;
}());
var assetsHost = 'https://static.ycsh6.com';
function buildAssetsPath(type, path, fillDir) {
    if (fillDir === void 0) { fillDir = ''; }
    if (path && !/^https?/.test(path)) {
        var pathAry = [assetsHost];
        if (type === 'program') {
            pathAry.push(type);
        }
        if (fillDir) {
            fillDir = fillDir.substr(0, 1) === '/' ? fillDir.substr(1, fillDir.length) : fillDir;
            fillDir = fillDir.substr(-1) === '/' ? fillDir.substr(0, fillDir.length - 1) : fillDir;
            pathAry.push(fillDir);
        }
        path = path.substr(0, 1) === '/' ? path.substr(1, path.length) : path;
        pathAry.push(path);
        path = pathAry.join('/');
    }
    return path;
}

exports.ApiSign = ApiSign;
exports.assert = assert;
exports.buildAssetsPath = buildAssetsPath;
exports.createNamespacedDatabase = createNamespacedDatabase;
exports.md5 = md5;
