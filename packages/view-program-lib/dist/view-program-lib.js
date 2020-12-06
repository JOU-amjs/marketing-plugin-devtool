/*!
  * view-program-lib 0.5.2 (https://github.com/JOU amjs/view-program-lib)
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
var ycsh6Helper = require('ycsh6-helper');

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

var MP_WEIXIN = 'mpWx';
var MP_ALIPAY = 'mpAlipay';
var BROWSER = 'browser';
var NODE = 'node';

function getMode() {
    var href = '';
    try {
        href = window.location.href;
    }
    catch (error) {
        href = '';
    }
    if (/devMode=1/.test(href)) {
        return 'plugin-dev';
    }
    else if (/devMode=2/.test(href) || !process.env.NODE_ENV) {
        return 'debug';
    }
    return 'prod';
}

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

var _a;
function environmentValue(envOption) {
    var mode = getMode();
    return envOption[mode] || '';
}
var hostname = process.env.NODE_ENV ? location.hostname : '';
var host = environmentValue({
    'plugin-dev': "http://" + hostname + ":18001",
    prod: 'https://api.ycsh6.com',
    debug: 'http://localhost:7001',
});
var javaHost = environmentValue({
    'plugin-dev': 'https://api.java.ycsh6.com',
    prod: 'https://api.java.ycsh6.com',
    debug: 'https://api.java.ycsh6.com',
});
var apiSign = {
    connectSymbol: '-',
    key: 'sd8mow3RPMDS0PMPmMP98AS2RG43T',
};
var tmplCodeMap = (_a = {},
    _a[MP_WEIXIN] = {
        activity: {
            id: 'i5sdedogJeiICuz0dfX-FC2yBdRdkwwcxCg1okRmnys',
            dataNames: ['name3', 'name2', 'thing1', 'thing4'],
            errorText: 'notifyData中必须包含受邀人、邀请人、活动名称、温馨提示4个数据',
        },
        payResult: {
            id: 'xxxxx',
            dataNames: ['name1'],
            errorText: 'notifyData中必须包含名称数据',
        },
    },
    _a[MP_ALIPAY] = {
        activity: {
            id: '',
            dataNames: [],
            errorText: 'notifyData中必须包含受邀人、邀请人、活动名称、温馨提示4个数据',
        },
        payResult: {
            id: '',
            dataNames: [],
            errorText: 'notifyData中必须包含受邀人、邀请人、活动名称、温馨提示4个数据',
        },
    },
    _a);
var viewProgramPath = '/pages/webview-container/webview-container';

var gl;
try {
    gl = window;
}
catch (error) {
    gl = {};
}
var wx = gl.wx;
delete gl.wx;
delete gl.jWeixin;

function getPlatform() {
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
    return BROWSER;
}
function buildPath(url, params, restfulParams) {
    if (params === void 0) { params = {}; }
    if (restfulParams === void 0) { restfulParams = {}; }
    Object.keys(restfulParams).forEach(function (paramName) {
        url = url.replace("{" + paramName + "}", restfulParams[paramName].toString());
    });
    var argStr = Object.keys(params)
        .map(function (key) { return key + "=" + params[key]; })
        .join('&');
    if (argStr) {
        argStr = (url.indexOf('?') >= 0 ? '&' : '?') + argStr;
    }
    return url + argStr;
}
function buildViewProgramUrl(pluginId, activityId, shopId, webPagePath, routePath, query) {
    if (routePath === void 0) { routePath = ''; }
    if (query === void 0) { query = {}; }
    webPagePath = webPagePath.substr(0, 1) === '/' ? webPagePath.substr(1) : webPagePath;
    webPagePath = webPagePath ?
        webPagePath.substr(-1) === '/' ? webPagePath : (webPagePath + '/')
        : webPagePath;
    var routeQuery = buildUrlParams(query);
    var queries = { accessToken: globalData.get('accessToken') || '' };
    var mode = globalData.get('mode');
    if (mode === 'plugin-dev') {
        queries.devMode = 1;
    }
    else if (mode === 'debug') {
        queries.devMode = 2;
    }
    return buildPath('/{pluginId}/{activityId}/{shopId}/online/{webPagePath}', queries, {
        pluginId: pluginId,
        activityId: activityId,
        shopId: shopId,
        webPagePath: webPagePath,
    }) + ("#/" + (routePath + routeQuery));
}
function navigateTo(url, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var environment;
        return __generator(this, function (_a) {
            environment = getPlatform();
            return [2, new Promise(function (resolve, reject) {
                    var urlBuilded = buildPath(url, params);
                    if (environment === MP_WEIXIN) {
                        wx.miniProgram.navigateTo({
                            url: urlBuilded,
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
                    else if (environment === MP_ALIPAY) {
                        throw new Error('暂不支持支付宝小程序');
                    }
                    else if (environment === BROWSER) {
                        if (!/^https?/.test(url)) {
                            var params_1 = parseUrlParams(url);
                            params_1.query = JSON.parse(decodeURIComponent(params_1.query || '') || '{}');
                            url = buildViewProgramUrl(params_1.pluginId, params_1.activityId, params_1.shopId, params_1.path, params_1.routePath, params_1.query);
                        }
                        location.href = url;
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
            environment = getPlatform();
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
function buildUrlParams(params, needQuestionMark) {
    if (params === void 0) { params = {}; }
    if (needQuestionMark === void 0) { needQuestionMark = true; }
    var paramStr = Object.keys(params)
        .map(function (key) { return key + "=" + params[key]; })
        .join('&');
    if (needQuestionMark) {
        paramStr = (paramStr ? '?' : '') + paramStr;
    }
    return paramStr;
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
function parseKeyParams(pathname) {
    if (pathname === void 0) { pathname = ''; }
    var keyParams = {
        pluginId: '',
        activityId: '',
        shopId: '',
    };
    pathname = pathname.substr(0, 1) === '/' ? pathname.substr(1) : pathname;
    var pathDataAry = pathname.split('/');
    var onlineStrIndex = pathDataAry.indexOf('online');
    if (onlineStrIndex <= -1) {
        throw new Error("current url is not a online program's url");
    }
    pathDataAry = pathDataAry.slice(0, onlineStrIndex);
    keyParams.pluginId = pathDataAry[0] || '';
    keyParams.activityId = pathDataAry[1] || '';
    keyParams.shopId = pathDataAry[2] || '';
    return keyParams;
}
function getInteractKey(isEcho) {
    if (isEcho === void 0) { isEcho = true; }
    return (globalData.get('activityId') || '') + (globalData.get('token') || '') + (isEcho ? '-echo' : '');
}
function getMPPath(path, routePath, query, hasBasePath) {
    if (hasBasePath === void 0) { hasBasePath = true; }
    var fillParams = {};
    if (routePath) {
        fillParams.routePath = routePath;
    }
    if (query) {
        fillParams.query = encodeURIComponent(JSON.stringify(query));
    }
    return buildPath(hasBasePath ? viewProgramPath : '', __assign({ activityId: globalData.get('activityId') || '', pluginId: globalData.get('pluginId') || '', shopId: globalData.get('shopId') || '', path: path }, fillParams));
}
function formatTime(time) {
    var fillZero = function (num) { return num >= 0 && num < 10 ? ('0' + num) : num.toString(); };
    return time.getFullYear() + "-" + fillZero(time.getMonth() + 1) + "-" + fillZero(time.getDate()) + " " + fillZero(time.getHours()) + ":" + fillZero(time.getMinutes()) + ":" + fillZero(time.getSeconds());
}

var as = new ycsh6Helper.ApiSign(apiSign.connectSymbol, apiSign.key);
function interceptor (request) {
    request.interceptors.request.use(function (config) {
        var platform = getPlatform(), accessToken = globalData.get('accessToken') || '', timestamp = Date.parse(new Date().toString()) / 1000;
        var method = config.method || 'get', args;
        if (/^put|post|patch|delete$/i.test(method)) {
            args = config.data = config.data || {};
        }
        else {
            args = config.params = config.params || {};
        }
        Object.assign(args, { platform: platform, timestamp: timestamp });
        args.sign = as.create(args);
        config.headers = __assign(__assign({}, (config.headers || {})), { 'Content-Type': 'application/json;charset=utf-8' });
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
                if (process.env.NODE_ENV === 'development') {
                    console.log('数据返回了非200状态 ==> ', response.data);
                }
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
var onFn = function (name, fn, once) {
    if (typeof fn === 'function' && typeof name === 'string') {
        fnCollection[name] = {
            once: false,
            fn: fn,
        };
    }
};
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
                emitFn.fn.apply(null, data.args);
                if (emitFn.once) {
                    delete fnCollection[data.name];
                }
            }
        });
    },
    on: function (name, fn) {
        onFn(name, fn);
    },
    once: function (name, fn) {
        onFn(name, fn);
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

function mpNavigateTo(_a) {
    var path = _a.path, routePath = _a.routePath, query = _a.query;
    if (getMode() === 'plugin-dev') {
        message.emit('navigate', {
            path: path,
            routePath: routePath,
            query: query
        });
    }
    return navigateTo(getMPPath(path, routePath, query));
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
    document.title = title;
    if (getMode() === 'plugin-dev') {
        message.emit('titleChanged', title);
    }
}
function updateShareMessage(shareOptions) {
    var matches = (location.hash.match(/^(.*?)(\?.*)?$/) || ['', '', '']);
    var params = parseUrlParams(matches[2]);
    params.shareMessage = encodeURIComponent(JSON.stringify(shareOptions));
    var newHash = buildPath(matches[1], params);
    window.history.replaceState(null, '', newHash);
}
function getUrlParam(paramName) {
    return globalData.get(paramName) || '';
}

var mp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    mpNavigateTo: mpNavigateTo,
    mpNavigateBack: mpNavigateBack,
    setTitle: setTitle,
    updateShareMessage: updateShareMessage,
    getUrlParam: getUrlParam
});

var routerHookNames = ['beforeEach', 'beforeResolve', 'afterEach'];
function Page(options, globalConfig) {
    if (options === void 0) { options = {}; }
    if (globalConfig === void 0) { globalConfig = { title: '' }; }
    if (Object.keys(options).length <= 0) {
        return {
            Vue: Vue,
            VueRouter: VueRouter,
            Vuex: Vuex,
            request: request,
            javaRequest: javaRequest,
            config: {
                shopId: globalData.get('shopId') || '',
                activityId: globalData.get('activityId') || '',
                pluginId: globalData.get('pluginId') || '',
            }
        };
    }
    var router = undefined, routers = globalConfig.routers, stores = globalConfig.stores, plugins = globalConfig.plugins, shareMessage = globalConfig.shareMessage, title = globalConfig.title, navColor = globalConfig.navColor;
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
    var mpInitData = { shareMessage: shareMessage, navColor: navColor };
    globalData.set('mpInitData', mpInitData);
    if (getMode() === 'plugin-dev') {
        message.init(window.parent);
        message.on('configData', function (configData) {
            globalData.set('shopConfiguration', configData);
            console.log('%c 接收提示', 'background:green;color:white', '插件视图(线上)已收到配置数据更改通知');
        });
        message.emit('pageConfig', mpInitData);
    }
    else {
        javaRequest.post('/user/interact/save', {
            key: globalData.get('pluginId'),
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
                        throw new Error(data.msg);
                    }
                    return [2, data.data];
            }
        });
    });
}

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
var payIntent = {
    COUPON_PURCHASE: 'couponPurchase',
    RECHARGE: 'recharge',
};
function pay(payOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var data, _a, echoKey, activityId, shopId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ycsh6Helper.assert(Object.values(payIntent).indexOf(payOptions.intent) >= 0, 'intent不正确，请使用`EL.payIntent`中的属性');
                    ycsh6Helper.assert(payOptions.amount > 0, '支付金额必须大于0，单位(元)');
                    if (payOptions.intent === 'couponPurchase') {
                        ycsh6Helper.assert(payOptions.couponGroupId, '购买卡券支付时，需传入couponGroupId');
                    }
                    if (!(getMode() === 'plugin-dev')) return [3, 3];
                    data = { payOptions: payOptions };
                    if (!(payOptions.intent === 'couponPurchase' && payOptions.couponGroupId)) return [3, 2];
                    _a = data;
                    return [4, getCouponInfo(payOptions.couponGroupId)];
                case 1:
                    _a.couponInfo = _b.sent();
                    _b.label = 2;
                case 2:
                    message.emit('pay', data);
                    return [2, new Promise(function (resolve, reject) {
                            message.once('payComplete', function (finish) { return finish ? resolve() : reject(new Error('取消支付')); });
                        })];
                case 3:
                    echoKey = getInteractKey();
                    activityId = globalData.get('activityId');
                    shopId = globalData.get('shopId');
                    navigateTo(interactPage, {
                        data: encodeURIComponent(JSON.stringify({
                            intent: 'pay',
                            echoKey: echoKey,
                            payload: {
                                payOptions: payOptions,
                                activityId: activityId,
                                shopId: shopId,
                            },
                        })),
                    });
                    return [2, getEchoData(echoKey)];
            }
        });
    });
}
function subscribeMessage(options, tipText, btnText) {
    return __awaiter(this, void 0, void 0, function () {
        var messageNames, platform, notifyDataMap, platformMsgCodeMap, tmplIds, echoKey, subscribeRes, tmplId2NameMap, name_1, tmplCodeItem, resAvailable, tmplId, optionMsgData, resTransform;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    messageNames = Object.keys(options);
                    ycsh6Helper.assert(messageNames.length > 0, '请至少订阅一条消息');
                    Object.keys(options).forEach(function (msgCode) {
                        var _a = options[msgCode], timing = _a.timing, channel = _a.channel, notifyData = _a.notifyData;
                        ycsh6Helper.assert(timing instanceof Date || typeof channel === 'string', "[MESSAGE_CODE:" + msgCode + "]\u5FC5\u987B\u6307\u5B9Atiming\u6216channel\u5176\u4E2D\u4E4B\u4E00");
                        ycsh6Helper.assert(notifyData.length > 0, "[MESSAGE_CODE:" + msgCode + "]\u6A21\u677F\u6570\u636E\u4E0D\u80FD\u4E3A\u7A7A");
                    });
                    platform = getPlatform();
                    if (process.env.NODE_ENV !== 'production') {
                        platform = MP_WEIXIN;
                    }
                    if (platform !== MP_WEIXIN && platform !== MP_ALIPAY) {
                        throw new Error("'" + platform + "'\u5E73\u53F0\u4E0A\u4E0D\u652F\u6301\u8BA2\u9605\u6D88\u606F");
                    }
                    notifyDataMap = {};
                    platformMsgCodeMap = tmplCodeMap[platform];
                    tmplIds = messageNames.map(function (msgName) {
                        var tmplCodeItem = platformMsgCodeMap[msgName];
                        if (tmplCodeItem) {
                            var notifyData_1 = options[msgName].notifyData || [];
                            if (notifyData_1.length >= tmplCodeItem.dataNames.length) {
                                var notifyDataObj_1 = {};
                                tmplCodeItem.dataNames.forEach(function (dataName, index) { return notifyDataObj_1[dataName] = notifyData_1[index]; });
                                notifyDataMap[tmplCodeItem.id] = notifyDataObj_1;
                            }
                            else {
                                throw new Error("[\u6D88\u606F:" + msgName + "]" + tmplCodeItem.errorText);
                            }
                        }
                        return tmplCodeItem.id;
                    }).filter(function (tmplCodeItem) { return tmplCodeItem; });
                    ycsh6Helper.assert(tmplIds.length > 0, '请传入有效的消息名');
                    echoKey = getInteractKey();
                    if (process.env.NODE_ENV === 'production') {
                        navigateTo(interactPage, {
                            data: encodeURIComponent(JSON.stringify({
                                intent: 'notice',
                                echoKey: echoKey,
                                payload: {
                                    tmplIds: tmplIds,
                                    tipText: tipText,
                                    btnText: btnText,
                                },
                            })),
                        });
                    }
                    subscribeRes = {};
                    if (!(process.env.NODE_ENV === 'production')) return [3, 2];
                    return [4, getEchoData(echoKey)];
                case 1:
                    subscribeRes = _a.sent();
                    return [3, 3];
                case 2:
                    tmplIds.forEach(function (tmplId) { return subscribeRes[tmplId] = 'accept'; });
                    _a.label = 3;
                case 3:
                    tmplId2NameMap = {};
                    for (name_1 in platformMsgCodeMap) {
                        tmplCodeItem = platformMsgCodeMap[name_1];
                        tmplId2NameMap[tmplCodeItem.id] = name_1;
                    }
                    resAvailable = {};
                    for (tmplId in subscribeRes) {
                        optionMsgData = options[tmplId2NameMap[tmplId]];
                        if (subscribeRes[tmplId] === 'accept' && optionMsgData) {
                            resAvailable[tmplId] = {
                                notifyData: notifyDataMap[tmplId],
                                timing: optionMsgData.timing ? formatTime(optionMsgData.timing) : '',
                                channel: optionMsgData.channel,
                                path: getMPPath(optionMsgData.path, optionMsgData.routePath, optionMsgData.query, false),
                            };
                        }
                    }
                    if (!(process.env.NODE_ENV === 'production')) return [3, 5];
                    return [4, callServerFunction({
                            name: 'subscribeMessage',
                            data: resAvailable,
                        })];
                case 4:
                    _a.sent();
                    return [3, 6];
                case 5:
                    console.log(resAvailable);
                    _a.label = 6;
                case 6:
                    resTransform = {};
                    Object.keys(subscribeRes).forEach(function (tmplId) {
                        resTransform[tmplId2NameMap[tmplId] || tmplId] = subscribeRes[tmplId];
                    });
                    return [2, resTransform];
            }
        });
    });
}
function share(shareOptions) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (getMode() === 'plugin-dev') {
                message.emit('toShare', shareOptions);
            }
            else {
                navigateTo(interactPage, {
                    data: window.encodeURIComponent(JSON.stringify({
                        intent: 'share',
                        payload: {
                            title: shareOptions.title,
                            imageUrl: shareOptions.imageUrl,
                            path: getMPPath(shareOptions.path, shareOptions.routePath, shareOptions.query),
                        },
                    })),
                });
            }
            return [2];
        });
    });
}
var pageCodes = {
    shopHomepage: '/page-other/shop-homepage/shop-homepage',
};
function navigateELPage(pageCode, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var path;
        return __generator(this, function (_a) {
            path = pageCodes[pageCode];
            ycsh6Helper.assert.notNull(path, "invalid pageCode`" + pageCode + "`");
            return [2, navigateTo(path, params)];
        });
    });
}
var userInfo = {
    SIMPLE: 0,
    PERSON: 1,
    LOYALTY: 2,
    WHOLE: 3,
};
function getUserInfo(infoLevel, tips) {
    if (infoLevel === void 0) { infoLevel = 0; }
    if (tips === void 0) { tips = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var requestInfo, userInfo, echoKey, finish;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestInfo = function () { return callServerFunction({
                        name: 'getUserInfo',
                        data: { info: infoLevel },
                    }); };
                    return [4, requestInfo()];
                case 1:
                    userInfo = _a.sent();
                    if (!((!userInfo || !userInfo.nickname) && (infoLevel === 1 || infoLevel === 3))) return [3, 4];
                    echoKey = getInteractKey();
                    navigateTo('/pages/login/login', {
                        tips: tips,
                        infoLevel: infoLevel,
                        echoKey: echoKey,
                        save: 'true',
                    });
                    return [4, getEchoData(echoKey)];
                case 2:
                    finish = _a.sent();
                    if (!finish) return [3, 4];
                    return [4, requestInfo()];
                case 3:
                    userInfo = _a.sent();
                    _a.label = 4;
                case 4: return [2, userInfo];
            }
        });
    });
}
function giveCoupon(groupId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            ycsh6Helper.assert(groupId, 'param `groupId` must be given');
            return [2, callServerFunction({
                    name: 'giveCoupon',
                    data: { customerId: userId, groupId: groupId },
                })];
        });
    });
}
function getCouponInfo(groupId) {
    return __awaiter(this, void 0, void 0, function () {
        var globalCouponKey, couponInfoMap, groupIds, couponRes, requestGroupIds, i, idItem, couponInfo, couponInfos_1, currentMilTs_1, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ycsh6Helper.assert.equalType(groupId, [Number, String, Array], 'groupIds must be given a string or a array of string');
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
                    couponInfos_1 = _a.sent();
                    currentMilTs_1 = Date.now();
                    requestGroupIds.forEach(function (groupId) {
                        var couponInfo = couponInfos_1.find(function (_a) {
                            var id = _a.id;
                            return id === groupId;
                        });
                        if (couponInfo) {
                            couponInfo.expireTime = new Date(couponInfo.expireTime * 1000);
                            couponInfo.status = couponInfo.expireTime.getTime() < currentMilTs_1 ? 0 : couponInfo.status;
                            if (typeof couponInfo.useLimit === 'string') {
                                couponInfo.useLimit = JSON.parse(couponInfo.useLimit || '[]');
                            }
                            couponInfoMap[couponInfo.id] = couponInfo;
                        }
                        couponRes[groupId] = couponInfo;
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
function getDishInfo(dishId) {
    return __awaiter(this, void 0, void 0, function () {
        var globalDishesKey, dishesInfoMap, dishIds, dishesRes, requestDishIds, i, idItem, dishInfo, dishInfos_1, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ycsh6Helper.assert.equalType(dishId, [String, Array], 'dishIds must be given a string or a array of string');
                    globalDishesKey = 'dishesInfo';
                    dishesInfoMap = globalData.get(globalDishesKey) || {};
                    dishIds = Array.isArray(dishId) ? dishId : [dishId];
                    dishesRes = {};
                    requestDishIds = [];
                    for (i in dishIds) {
                        idItem = dishIds[i];
                        dishInfo = dishesInfoMap[idItem];
                        if (!dishInfo) {
                            requestDishIds.push(idItem);
                        }
                        else {
                            dishesRes[dishInfo.id] = dishInfo;
                        }
                    }
                    if (!(requestDishIds.length > 0)) return [3, 2];
                    return [4, callServerFunction({
                            name: 'getDishInfo',
                            data: { dishId: requestDishIds },
                        })];
                case 1:
                    dishInfos_1 = _a.sent();
                    requestDishIds.forEach(function (dishId) {
                        var couponInfo = dishInfos_1.find(function (_a) {
                            var id = _a.id;
                            return id === dishId;
                        });
                        if (couponInfo) {
                            dishesInfoMap[couponInfo.id] = couponInfo;
                        }
                        dishesRes[dishId] = couponInfo;
                    });
                    _a.label = 2;
                case 2:
                    if (Array.isArray(dishId)) {
                        return [2, dishesRes];
                    }
                    else {
                        keys = Object.keys(dishesRes);
                        return [2, keys.length > 0 ? dishesRes[keys[0]] : null];
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
function getConfiguration(allUnions, page, pageSize) {
    if (allUnions === void 0) { allUnions = false; }
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 50; }
    return __awaiter(this, void 0, void 0, function () {
        var globalConfigKey, configData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    globalConfigKey = 'shopConfiguration';
                    configData = globalData.get(globalConfigKey);
                    if (!!configData) return [3, 2];
                    return [4, callServerFunction({
                            name: 'getConfiguration',
                            data: { allUnions: allUnions, page: page, pageSize: pageSize },
                        })];
                case 1:
                    configData = _a.sent();
                    globalData.set(globalConfigKey, configData);
                    _a.label = 2;
                case 2: return [2, configData];
            }
        });
    });
}
function notifyMessage(channel) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, callServerFunction({
                    name: 'notifyMessage',
                    data: { channel: channel },
                })];
        });
    });
}
function changeShop(shopId) {
    shopId = shopId.toString().trim();
    var currentShopId = globalData.get('shopId') || '';
    if (shopId && currentShopId !== shopId) {
        location.href = location.href.replace(/\w+(\/\w+\/)online/, function (mat, rep) {
            return mat.replace(rep, "/" + shopId + "/");
        });
    }
}

var el = /*#__PURE__*/Object.freeze({
    __proto__: null,
    payIntent: payIntent,
    pay: pay,
    subscribeMessage: subscribeMessage,
    share: share,
    navigateELPage: navigateELPage,
    userInfo: userInfo,
    getUserInfo: getUserInfo,
    giveCoupon: giveCoupon,
    getCouponInfo: getCouponInfo,
    getDishInfo: getDishInfo,
    getShopInfo: getShopInfo,
    getConfiguration: getConfiguration,
    notifyMessage: notifyMessage,
    changeShop: changeShop
});

var _a$1;
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
var storages = (_a$1 = {},
    _a$1[LOCAL_STORAGE] = {
        globalThis: window.localStorage,
        namespace: '',
    },
    _a$1[SESSION_STORAGE] = {
        globalThis: window.sessionStorage,
        namespace: '',
    },
    _a$1);
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

var params = parseUrlParams(window.location.search);
var hashParams = parseUrlParams(window.location.hash);
var keyParams = parseKeyParams(window.location.pathname);
var pluginMode = getMode();
globalData.set(__assign(__assign(__assign(__assign({}, params), hashParams), keyParams), { mode: pluginMode }));
if (!keyParams.activityId || !keyParams.shopId) {
    throw new Error("query `activityId` and `shopId` must be given");
}
var activityId = keyParams.activityId, namespace = activityId || '', localStorage = new NamespacedStorage(namespace, LOCAL_STORAGE), sessionStorage = new NamespacedStorage(namespace, SESSION_STORAGE), database = ycsh6Helper.createNamespacedDatabase(function (proxyObject) {
    return javaRequest({
        url: '/mongo/collections/operation',
        method: 'post',
        data: {
            activityId: namespace,
            pluginId: globalData.get('pluginId'),
            env: getMode() === 'plugin-dev' ? 1 : 2,
            db: proxyObject,
        },
    });
});
if (pluginMode === 'prod') {
    Object.defineProperties(window, {
        localStorage: { value: localStorage },
        sessionStorage: { value: sessionStorage },
    });
}
var index = __assign(__assign({ Page: Page,
    database: database }, el), mp);

module.exports = index;
