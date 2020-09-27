/*
 * @Date: 2020-09-25 18:04:26
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-25 18:05:32
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sintent = Symbol('intent'), sconfig = Symbol('config'), sclientParams = Symbol('clientParams');
class Server {
    constructor(intent, database, config, clientParams) {
        this[sintent] = intent;
        this[sconfig] = config;
        this[sclientParams] = clientParams;
        this.database = database;
    }
    getIntent() {
        return this[sintent];
    }
    getConfiguration() {
        return this[sconfig];
    }
    getClientParams(key) {
        let value;
        const clientParams = this[sclientParams];
        if (clientParams && clientParams[key]) {
            value = clientParams[key];
        }
        return value;
    }
}
exports.default = Server;