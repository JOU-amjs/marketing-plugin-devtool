/*!
  * view-program-lib 0.2.5 (https://github.com/JOU amjs/view-program-lib)
  * API https://github.com/JOU amjs/view-program-lib/blob/master/doc/api.md
  * Copyright 2017-2020 JOU amjs. All Rights Reserved
  * Licensed under MIT (https://github.com/JOU amjs/view-program-lib/blob/master/LICENSE)
  */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var VueRouter = _interopDefault(require('vue-router'));
var Vuex = _interopDefault(require('vuex'));
var axios = _interopDefault(require('axios'));
var tsMd5 = require('ts-md5');
var qs = _interopDefault(require('qs'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function environmentValue(envOption) {
    var href = '';
    try {
        href = window.location.href;
    }
    catch (error) {
        href = '';
    }
    var pluginMode = /devMode=1/.test(href) ? 'plugin-dev' : 'prod';
    return envOption[pluginMode] || '';
}
var host = environmentValue({
    'plugin-dev': 'https://api.ycsh6.com',
    prod: 'http://localhost:18001',
});
var javaHost = environmentValue({
    'plugin-dev': 'http://148.70.36.197:8080',
    prod: 'http://148.70.36.197:8080',
});
var apiSign = {
    connectSymbol: '-',
    key: 'sd8mow3RPMDS0PMPmMP98AS2RG43T',
};

var MP_WEIXIN = 'mpWx';
var MP_ALIPAY = 'mpAlipay';
var BROWSER = 'browser';
var NODE = 'node';
var MESSAGE_CODE = {
    activity: 'activity',
    payResult: 'pay_result',
};
var WEBVIEW_BASE_URL = 'https://mp.online.ycsh6.com/';

var gl;
try {
    gl = window;
}
catch (error) {
    gl = global;
}
var wx = gl.wx;
delete gl.wx;
delete gl.jWeixin;

var data = {};
function setItem(key, val) {
    if (val) {
        data[key] = val;
    }
    else {
        delete data[key];
    }
}
var globalData = {
    set: function (keyOrObject, val) {
        var _a;
        var map = typeof keyOrObject === 'object' ? keyOrObject : (_a = {}, _a[keyOrObject] = val, _a);
        for (var key in map) {
            setItem(key, map[key]);
        }
    },
    get: function (key) {
        var typeOfKey = typeof key;
        if (typeOfKey === 'string' || typeOfKey === 'number') {
            return data[key];
        }
    }
};

function getEnvironment() {
    var userAgent = '';
    try {
        userAgent = window.navigator.userAgent.toLowerCase();
    }
    catch (error) {
        userAgent = 'nodejs';
    }
    if (userAgent.indexOf('miniprogram') !== -1) {
        return MP_WEIXIN;
    }
    else if (userAgent.indexOf('alipay miniprogram') !== -1) {
        return MP_ALIPAY;
    }
    else if (userAgent.indexOf('node') !== -1) {
        return NODE;
    }
    else {
        return BROWSER;
    }
}
function buildPath(url, params) {
    if (params === void 0) { params = {}; }
    var argStr = Object.keys(params)
        .map(function (key) { return key + "=" + params[key]; })
        .join('&');
    if (argStr) {
        argStr = (url.indexOf('?') >= 0 ? '&' : '?') + argStr;
    }
    return url + argStr;
}
function navigateTo(url, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var environment;
        return __generator(this, function (_a) {
            environment = getEnvironment();
            return [2, new Promise(function (resolve, reject) {
                    if (environment === MP_WEIXIN) {
                        wx.miniProgram.navigateTo({
                            url: buildPath(url, params),
                            success: function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                return resolve(args);
                            },
                            fail: function (reason) { return reject(reason); },
                        });
                    }
                })];
        });
    });
}
function navigateBack(delta) {
    if (delta === void 0) { delta = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var environment;
        return __generator(this, function (_a) {
            environment = getEnvironment();
            return [2, new Promise(function (resolve, reject) {
                    if (environment === MP_WEIXIN) {
                        wx.miniProgram.navigateBack({
                            delta: delta,
                            success: function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                return resolve(args);
                            },
                            fail: function (reason) { return reject(reason); },
                        });
                    }
                })];
        });
    });
}
function getMode() {
    var devMode = globalData.get('devMode');
    return (devMode === null || devMode === void 0 ? void 0 : devMode.toString()) === '1' && getEnvironment() === 'browser' ? 'plugin-dev' : 'prod';
}
function createApiSign(params) {
    if (params === void 0) { params = {}; }
    var rawStr = Object.keys(params).sort()
        .map(function (key) { return params[key] !== undefined ? key + "=" + params[key] : undefined; })
        .filter(function (item) { return item; })
        .join(apiSign.connectSymbol) + apiSign.key;
    return tsMd5.Md5.hashStr(rawStr);
}
function parseUrlParams(url) {
    var params = {};
    (url.match(/\?(.*)$/) || ['', ''])[1]
        .split('&').forEach(function (param) {
        var keyVal = param.split('=');
        if (keyVal.length === 2) {
            params[keyVal[0]] = keyVal[1];
        }
    });
    return params;
}
function parseMpCode(pathname) {
    if (pathname === void 0) { pathname = ''; }
    pathname = pathname.substr(0, 1) === '/' ? pathname.substr(1) : pathname;
    return pathname.split('/')[0];
}
function getInteractKey(isEcho) {
    if (isEcho === void 0) { isEcho = true; }
    return (globalData.get('activityId') || '') + (globalData.get('token') || '') + (isEcho ? '-echo' : '');
}
function buildWebAbsolutePath(_a) {
    var url = _a.url, _b = _a.params, params = _b === void 0 ? {} : _b, _c = _a.routePath, routePath = _c === void 0 ? '' : _c;
    url = url.substr(0, 1) === '/' ? url.substr(1) : url;
    var relativePath = buildPath("/" + globalData.get('mpCode') + "/" + url + ".html/#/" + routePath, __assign({ activityId: globalData.get('activityId') || '', shopId: globalData.get('shopId') || '' }, params));
    return WEBVIEW_BASE_URL + relativePath;
}

function interceptor (request) {
    request.interceptors.request.use(function (config) {
        var platform = getEnvironment(), accessToken = globalData.get('accessToken') || '', timestamp = Date.parse(new Date().toString()) / 1000;
        var method = config.method || 'get', args;
        if (/^put|post|patch|delete$/i.test(method)) {
            args = config.data = config.data || {};
        }
        else {
            args = config.params = config.params || {};
        }
        Object.assign(args, { platform: platform, timestamp: timestamp });
        args.sign = createApiSign(args);
        if (/^put|post|patch|delete$/i.test(method)) {
            config.data = qs.stringify(args);
        }
        if (accessToken) {
            config.headers[method.toLowerCase() || 'get']['x-access-token'] = accessToken;
        }
        return config;
    }, function (error) {
        Promise.reject(error);
    });
    request.interceptors.response.use(function (response) {
        if (response.status === 200) {
            if (response.data.code === 200) {
                return response;
            }
            else {
                console.log('数据返回了非200状态 ==> ', response.data);
                return Promise.reject(new Error(response.data.msg));
            }
        }
        else {
            return Promise.reject(response);
        }
    }, function (error) {
        return Promise.reject(error.response);
    });
}

var request = axios.create({
    baseURL: host,
    timeout: 30000,
});
interceptor(request);
var javaRequest = axios.create({
    baseURL: javaHost,
    timeout: 30000,
});
interceptor(javaRequest);

var receiver;
var fnCollection = {};
var message = {
    init: function (originReceive) {
        if (!originReceive) {
            return;
        }
        receiver = originReceive;
        window.addEventListener('message', function (event) {
            var data = event.data;
            var emitFn = fnCollection[data.name];
            if (emitFn) {
                emitFn.apply(null, data.args);
            }
        });
    },
    on: function (name, fn) {
        if (typeof fn === 'function' && typeof name === 'string') {
            fnCollection[name] = fn;
        }
    },
    emit: function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (receiver) {
            receiver.postMessage({ name: name, args: args }, '*');
        }
    },
};

var viewProgramPath = 'pages/webview-container/webview-container';
function mpNavigateTo(options) {
    return navigateTo(viewProgramPath, {
        url: window.encodeURIComponent(buildWebAbsolutePath(options)),
    });
}
function mpNavigateBack(delta) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, navigateBack(delta)];
        });
    });
}
function setTitle(title) {
    if (!title) {
        return;
    }
    var domTitle = document.querySelector('title');
    if (domTitle) {
        domTitle.innerHTML = title;
        if (getMode() === 'plugin-dev') {
            message.emit('titleChanged', title);
        }
    }
}
function updateShareMessage(shareOptions) {
    var matches = (location.hash.match(/^(.*?)(\?.*)?$/) || ['', '', '']);
    var params = parseUrlParams(matches[2]);
    params.shareMessage = encodeURIComponent(JSON.stringify(shareOptions));
    var newHash = buildPath(matches[1], params);
    window.history.replaceState(null, '', newHash);
}
function changeShopInCurrentPage(shopId) {
    var currentShopId = globalData.get('shopId') || '';
    if (currentShopId !== shopId) {
        location.href = location.href.replace(/shopId=([^&]+)/, function () { return "shopId=" + shopId; });
        location.reload();
    }
}

var mp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    mpNavigateTo: mpNavigateTo,
    mpNavigateBack: mpNavigateBack,
    setTitle: setTitle,
    updateShareMessage: updateShareMessage,
    changeShopInCurrentPage: changeShopInCurrentPage
});

var routerHookNames = ['beforeEach', 'beforeResolve', 'afterEach'];
function Page(options, globalConfig) {
    if (options === void 0) { options = {}; }
    if (globalConfig === void 0) { globalConfig = { title: '' }; }
    if (Object.keys(options).length <= 0) {
        return { Vue: Vue, VueRouter: VueRouter, Vuex: Vuex };
    }
    var router = undefined, routers = globalConfig.routers, stores = globalConfig.stores, plugins = globalConfig.plugins, shareMessage = globalConfig.shareMessage, title = globalConfig.title;
    if (typeof routers === 'object' && Array.isArray(routers.routes) && routers.routes.length > 0) {
        Vue.use(VueRouter);
        router = new VueRouter(routers);
        routerHookNames.forEach(function (hookName) {
            if (routers && router && typeof routers[hookName] === 'function') {
                router[hookName](routers[hookName]);
            }
        });
    }
    var store = undefined;
    if (typeof stores === 'object' && Object.keys(stores).length > 0) {
        Vue.use(Vuex);
        store = new Vuex.Store(stores);
    }
    if (Array.isArray(plugins) && plugins.length > 0) {
        plugins.forEach(function (_a) {
            var pluginInstance = _a[0], arg = _a[1];
            Vue.use(pluginInstance, arg);
        });
    }
    var mpInitData = {
        shareMessage: shareMessage,
    };
    globalData.set('mpInitData', mpInitData);
    if (getMode() === 'plugin-dev') {
        message.init(window.parent);
        message.on('configData', function (configData) {
            globalData.set('shopConfiguration', configData);
            console.log('%c 接收提示', 'background:green;color:white', '插件视图(线上)已收到配置数据更改通知');
        });
    }
    else {
        javaRequest.post('/user/interact/save', {
            key: globalData.get('mpCode'),
            value: mpInitData,
        });
    }
    if (typeof title === 'string') {
        setTitle(title);
    }
    else if (typeof title === 'function') {
        var callRes = title();
        if (typeof callRes === 'string') {
            setTitle(callRes);
        }
        else if (callRes instanceof Promise) {
            callRes.then(function (res) {
                if (typeof res === 'string') {
                    setTitle(res);
                }
            });
        }
    }
    new Vue({
        router: router,
        store: store,
        render: function (h) { return h(options); },
    }).$mount('#app');
}

function callServerFunction (options) {
    return __awaiter(this, void 0, void 0, function () {
        var activityId, shopId, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    activityId = globalData.get('activityId');
                    shopId = globalData.get('shopId');
                    return [4, request.post('/v1/call_viewprogramme_function', __assign({ activityId: activityId,
                            shopId: shopId }, options))];
                case 1:
                    data = (_a.sent()).data;
                    if (data.code !== 200) {
                        throw new Error("[ViewProgramServerError]" + data.msg);
                    }
                    return [2, data.data];
            }
        });
    });
}

var errorPrefix = 'assert';
var Assert = (function () {
    function Assert() {
    }
    Assert.notNull = function (val, message) {
        if (val === null || val === undefined) {
            throw new Error("[" + errorPrefix + "]" + (message || '参数不能为空'));
        }
    };
    Assert.match = function (val, reg, message) {
        if (!reg.test(val)) {
            throw new Error("[" + errorPrefix + "]" + (message || '参数与指定正则表达式不匹配'));
        }
    };
    Assert.equal = function (val, equalVal, message) {
        if (val !== equalVal) {
            throw new Error("[" + errorPrefix + "]" + (message || '参数与指定参数不相等'));
        }
    };
    Assert.equalType = function (val, type, message) {
        var typeAry = Array.isArray(type) ? type : [type];
        var equalPass = false;
        for (var i in typeAry) {
            if (typeAry[i] === (val === null || val === void 0 ? void 0 : val.constructor)) {
                equalPass = true;
                break;
            }
        }
        if (!equalPass) {
            throw new Error("[" + errorPrefix + "]" + (message || '参数与指定类型不匹配'));
        }
    };
    return Assert;
}());

function getEchoData (echoKey) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        if (!echoKey) {
            reject('echoKey不能为空');
            return;
        }
        var timer = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            var data, echoData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, javaRequest.get('/user/interact/get', {
                            params: { key: echoKey },
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        echoData = data.data;
                        if (data.code !== 200 || !echoData) {
                            return [2];
                        }
                        javaRequest.get('/user/interact/notify', {
                            params: { key: echoKey },
                        });
                        clearInterval(timer);
                        if (echoData.exception) {
                            reject(echoData.exception);
                        }
                        else {
                            resolve(echoData.response);
                        }
                        return [2];
                }
            });
        }); }, 1500);
    });
}

var interactPage = '/pages/interact-webview-miniprogram/interact-webview-miniprogram';
function pay(payOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var echoKey;
        return __generator(this, function (_a) {
            echoKey = getInteractKey();
            navigateTo(interactPage, {
                data: window.encodeURIComponent(JSON.stringify({
                    intent: 'pay',
                    echoKey: echoKey,
                    payload: __assign(__assign({}, payOptions), { shopId: globalData.get('shopId') || '' }),
                })),
            });
            return [2, getEchoData(echoKey)];
        });
    });
}
function subscribeMessage(noticeOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var echoKey;
        return __generator(this, function (_a) {
            echoKey = getInteractKey();
            navigateTo(interactPage, {
                data: window.encodeURIComponent(JSON.stringify({
                    intent: 'notice',
                    echoKey: echoKey,
                    payload: noticeOptions,
                })),
            });
            return [2, getEchoData(echoKey)];
        });
    });
}
function share(shareOptions) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            navigateTo(interactPage, {
                data: window.encodeURIComponent(JSON.stringify({
                    intent: 'share',
                    payload: __assign(__assign({}, shareOptions), { absolutePath: buildWebAbsolutePath({
                            url: shareOptions.path,
                            routePath: shareOptions.routePath,
                            params: shareOptions.params,
                        }) }),
                })),
            });
            return [2];
        });
    });
}
var pageCodes = {
    shopHomepage: 'pages/shop-homepage/shop-homepage',
};
function navigateELPage(pageCode, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var path;
        return __generator(this, function (_a) {
            path = pageCodes[pageCode];
            Assert.notNull(path, "invalid pageCode`" + pageCode + "`");
            return [2, navigateTo(buildPath(path, params))];
        });
    });
}
function getUserInfo(tips) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, echoKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, callServerFunction({ name: 'getUserInfo' })];
                case 1:
                    userInfo = _a.sent();
                    if (!!userInfo) return [3, 3];
                    echoKey = getInteractKey();
                    navigateTo(buildPath('pages/login/login', { tips: tips, echoKey: echoKey }));
                    return [4, getEchoData(echoKey)];
                case 2:
                    userInfo = _a.sent();
                    _a.label = 3;
                case 3: return [2, userInfo];
            }
        });
    });
}
function giveCoupon(userId, groupId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            Assert.equal(!userId || !groupId, true, 'both params `userId` and `groupId` must be given');
            return [2, callServerFunction({
                    name: 'giveCoupon',
                    data: { customerId: userId, groupId: groupId },
                })];
        });
    });
}
function getCouponInfo(groupId) {
    return __awaiter(this, void 0, void 0, function () {
        var globalCouponKey, couponInfoMap, groupIds, couponRes, requestGroupIds, i, idItem, couponInfo, couponInfos, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Assert.equalType(groupId, [String, Array], 'groupIds must be given a string or a array of string');
                    globalCouponKey = 'couponInfo';
                    couponInfoMap = globalData.get(globalCouponKey) || {};
                    groupIds = Array.isArray(groupId) ? groupId : [groupId];
                    couponRes = {};
                    requestGroupIds = [];
                    for (i in groupIds) {
                        idItem = groupIds[i];
                        couponInfo = couponInfoMap[idItem];
                        if (!couponInfo) {
                            requestGroupIds.push(idItem);
                        }
                        else {
                            couponRes[couponInfo.id] = couponInfo;
                        }
                    }
                    if (!(requestGroupIds.length > 0)) return [3, 2];
                    return [4, callServerFunction({
                            name: 'getCouponInfo',
                            data: { groupId: requestGroupIds },
                        })];
                case 1:
                    couponInfos = _a.sent();
                    couponInfos.forEach(function (couponInfo) {
                        couponRes[couponInfo.id] = couponInfoMap[couponInfo.id] = couponInfo;
                    });
                    _a.label = 2;
                case 2:
                    if (Array.isArray(groupId)) {
                        return [2, couponRes];
                    }
                    else {
                        keys = Object.keys(couponRes);
                        return [2, keys.length > 0 ? couponRes[keys[0]] : null];
                    }
            }
        });
    });
}
function getShopInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var globalShopInfoKey, shopInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    globalShopInfoKey = 'shopInfo';
                    shopInfo = globalData.get(globalShopInfoKey);
                    if (!!shopInfo) return [3, 2];
                    return [4, callServerFunction({ name: 'getShopInfo' })];
                case 1:
                    shopInfo = _a.sent();
                    globalData.set(globalShopInfoKey, shopInfo);
                    _a.label = 2;
                case 2: return [2, shopInfo];
            }
        });
    });
}
function getConfiguration() {
    return __awaiter(this, void 0, void 0, function () {
        var globalConfigKey, configData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    globalConfigKey = 'shopConfiguration';
                    configData = globalData.get(globalConfigKey);
                    if (!!configData) return [3, 2];
                    return [4, callServerFunction({ name: 'getConfiguration' })];
                case 1:
                    configData = _a.sent();
                    globalData.set(globalConfigKey, configData);
                    _a.label = 2;
                case 2: return [2, configData];
            }
        });
    });
}

var el = /*#__PURE__*/Object.freeze({
    __proto__: null,
    pay: pay,
    subscribeMessage: subscribeMessage,
    share: share,
    navigateELPage: navigateELPage,
    getUserInfo: getUserInfo,
    giveCoupon: giveCoupon,
    getCouponInfo: getCouponInfo,
    getShopInfo: getShopInfo,
    getConfiguration: getConfiguration
});

var _a;
var structKey = function (namespace, key) { return namespace + key.toString(); };
var STORAGE_KEYS_SUFFIX = '__$$namespaced_storage_keys$$__';
var getGlobalThisInfo = function (storageTag) {
    var _a = storages[storageTag], globalThis = _a.globalThis, namespace = _a.namespace;
    var keysStoreKey = structKey(namespace, STORAGE_KEYS_SUFFIX);
    return {
        storage: globalThis,
        keysStoreKey: keysStoreKey,
        namespace: namespace,
        keys: JSON.parse(globalThis.getItem(keysStoreKey) || '[]'),
    };
};
var LOCAL_STORAGE = 'localStorage';
var SESSION_STORAGE = 'sessionStorage';
var storages = (_a = {},
    _a[LOCAL_STORAGE] = {
        globalThis: window.localStorage,
        namespace: '',
    },
    _a[SESSION_STORAGE] = {
        globalThis: window.sessionStorage,
        namespace: '',
    },
    _a);
var NamespacedStorage = (function () {
    function NamespacedStorage(namespace, storageTag) {
        storages[storageTag].namespace = namespace;
        this.storageTag = storageTag;
        var keys = getGlobalThisInfo(storageTag).keys;
        this.length = keys.length;
    }
    NamespacedStorage.prototype.setItem = function (key, value) {
        var _a = getGlobalThisInfo(this.storageTag), storage = _a.storage, keys = _a.keys, keysStoreKey = _a.keysStoreKey, namespace = _a.namespace;
        var index = keys.indexOf(key);
        if (keys.length > 0 && index >= 0) {
            keys[index] = key;
        }
        else {
            keys.push(key);
        }
        this.length = keys.length;
        storage.setItem(keysStoreKey, JSON.stringify(keys));
        return storage.setItem(structKey(namespace, key), value);
    };
    NamespacedStorage.prototype.getItem = function (key) {
        var _a = getGlobalThisInfo(this.storageTag), storage = _a.storage, namespace = _a.namespace;
        return storage.getItem(structKey(namespace, key));
    };
    NamespacedStorage.prototype.removeItem = function (key) {
        var _a = getGlobalThisInfo(this.storageTag), storage = _a.storage, keys = _a.keys, keysStoreKey = _a.keysStoreKey, namespace = _a.namespace;
        var index = keys.indexOf(key);
        if (keys.length > 0 && index >= 0) {
            keys.splice(index, 1);
        }
        this.length = keys.length;
        storage.setItem(keysStoreKey, JSON.stringify(keys));
        return storage.removeItem(structKey(namespace, key));
    };
    NamespacedStorage.prototype.clear = function () {
        var _a = getGlobalThisInfo(this.storageTag), storage = _a.storage, keys = _a.keys, keysStoreKey = _a.keysStoreKey, namespace = _a.namespace;
        if (keys.length > 0) {
            keys.forEach(function (key) { return storage.removeItem(structKey(namespace, key)); });
        }
        this.length = 0;
        storage.removeItem(keysStoreKey);
    };
    NamespacedStorage.prototype.key = function (index) {
        var key = null;
        var _a = getGlobalThisInfo(this.storageTag), keys = _a.keys, namespace = _a.namespace;
        var namespacedKey = keys[index];
        if (typeof namespacedKey === 'string') {
            key = namespacedKey.replace(namespace, '');
        }
        return key;
    };
    return NamespacedStorage;
}());

var commonWord = function (name) { return "forbidden call function `" + name + "`"; }, collectionForbiddenCalledFns = {
    drop: commonWord('drop') + ', instead you can delete collection by editing property `database` in plugin.js',
};
function createProxyedPromise(target, handler, executor) {
    var protoProxy = new Proxy(target, handler);
    Object.setPrototypeOf(Promise.prototype, protoProxy);
    return new Promise(executor);
}
function createCollectionProxy(collectionName, activityId) {
    var proxyObject = { collection: collectionName };
    var collectionProxyedPromise = createProxyedPromise(proxyObject, {
        get: function (target, key) {
            var exceptionstring = collectionForbiddenCalledFns[key];
            if (typeof exceptionstring === 'string') {
                throw new Error(exceptionstring);
            }
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                target[key] = args;
                return collectionProxyedPromise;
            };
        },
    }, function (resolve, reject) {
        setTimeout(function () {
            if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
                javaRequest({
                    url: '/dbtransformer',
                    method: 'POST',
                    data: {
                        activityId: activityId,
                        db: proxyObject
                    },
                }).then(function (res) { return resolve(res); }, function (rej) { return reject(rej); });
            }
            else {
                resolve({ activityId: activityId, db: proxyObject });
            }
        });
    });
    return collectionProxyedPromise;
}
var dbForbiddenCalledFns = {
    dropDatabase: commonWord('dropDatabase'),
    createDatabase: commonWord('createDatabase'),
    createCollection: commonWord('createCollection') + ', collections will create automatically when uploading',
};
function createNamespacedDatabase(activityId) {
    return new Proxy({}, {
        get: function (_, key) {
            var exceptionstring = dbForbiddenCalledFns[key];
            if (typeof exceptionstring === 'string') {
                throw new Error(exceptionstring);
            }
            return createCollectionProxy(key, activityId);
        },
    });
}

var pluginMode = getMode();
var params = parseUrlParams(window.location.href);
params.mpCode = parseMpCode(window.location.pathname);
globalData.set(params);
if (!params.activityId || !params.shopId) {
    throw new Error("query `activityId` and `shopId` must be given");
}
var activityId = params.activityId, namespace = activityId || '', localStorage = new NamespacedStorage(namespace, LOCAL_STORAGE), sessionStorage = new NamespacedStorage(namespace, SESSION_STORAGE), database = createNamespacedDatabase(namespace), warnGetter = function (storageTag) { return function () { return console.warn("please use `EL." + storageTag + "` with the same usage."); }; };
if (pluginMode === 'prod') {
    Object.defineProperties(window, {
        localStorage: { get: warnGetter('localStorage') },
        sessionStorage: { get: warnGetter('sessionStorage') },
    });
}
var index = __assign(__assign({ Page: Page,
    MESSAGE_CODE: MESSAGE_CODE,
    localStorage: localStorage,
    sessionStorage: sessionStorage,
    database: database }, el), mp);

module.exports = index;
