/*
 * @Date: 2020-09-25 18:10:41
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-26 10:35:08
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModule = exports.readMPCode = void 0;
class Module {
    set exports(module) {
        if (!module) {
            throw new Error('你是否忘记通过`module.exports`导出营销程序类？');
        }
        // if (module instanceof MenuProgramme_1.default) {
        //     const parentClass = Object.getPrototypeOf(module);
        //     if (parentClass !== MenuProgramme_1.default) {
        //         throw new Error('你导出的营销程序是否忘记继承`EL.MenuProgramme`？');
        //     }
        // }
        this.__exports__ = module;
    }
}
async function readMPCode(codeId, pluginId, version, app) {
    const codeIdPathMap = {
        mpClass: app.config.mpClassFilename,
        paymentCallback: app.config.paymentCallback,
        configView: app.config.mpConfigurationFilename,
    }, cache = app.cache, classTimeout = 5 * 3600, cacheKey = app.CONSTANT.cacheTag.MP_CODE + pluginId;
    let codeStr = null;
    if (!app.config.mpDebugMode) {
        codeStr = await cache.hget(cacheKey, codeId);
    }
    if (!codeStr) {
        let path = `${app.config.MP_URL}/${pluginId}/${codeIdPathMap[codeId]}?v=${version}`;
        const codeRes = await app.httpclient.request(path, {
            dataType: 'text',
            method: 'GET',
        });
        codeStr = codeRes.data;
        if (codeRes.status !== 200) {
            codeStr = '';
            app.logger.warn('[加载营销方案数据失败]:错误代码%s,加载地址:%s', codeRes.status, path);
        }
        else if (codeRes.status === 200 && !app.config.mpDebugMode) {
            await cache.eval(`
          redis.call("hset", ARGV[1], ARGV[2], ARGV[3]);
          redis.call("expire", ARGV[1], ARGV[4]);
        `, 0, cacheKey, codeId, codeStr || '', classTimeout);
        }
    }
    return codeStr;
}
exports.readMPCode = readMPCode;
function parseModule(mpString, onlineServerCode = false) {
    let exportedModule;
    let module = undefined;
    if (onlineServerCode) {
        module = new Module();
    }
    else {
        mpString = 'return ' + mpString;
    }
    let retMod = new Function('EL', 'module', mpString)(onlineServerCode ? undefined : EL, onlineServerCode ? module : undefined);
    if (module && module.__exports__) {
        exportedModule = module.__exports__;
    }
    else if (retMod && retMod.default) {
        exportedModule = retMod.default;
    }
    return exportedModule;
}
exports.parseModule = parseModule;