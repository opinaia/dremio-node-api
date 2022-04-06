"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw = void 0;
const request = __importStar(require("request-promise-native"));
var raw;
(function (raw) {
    function getUrl(config, suffix) {
        return (config.ssl ? 'https' : 'http') + '://' + config.host + ':' + (config.port || 9047) + '/' + suffix;
    }
    raw.LOGIN = 'apiv2/login';
    raw.FIRST_USER = 'apiv2/bootstrap/firstuser';
    raw.USER = 'apiv2/user';
    raw.USERS = 'apiv2/users';
    raw.SQL = 'api/v3/sql';
    raw.JOB = 'api/v3/job';
    raw.CATALOG = 'api/v3/catalog';
    raw.SOURCE = 'api/v3/source';
    function urlArgsToString(urlArgs) {
        let s = '?';
        Object.keys(urlArgs).forEach(key => {
            s += '&' + key + '=' + urlArgs[key];
        });
        return s;
    }
    function makeRequest(config, method, token, prefix, id, suffix, urlArgs, body, encoding) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                json: encoding !== null,
                method: method,
                headers: token === null ? undefined : {
                    Authorization: token,
                    'Content-type': 'application/json'
                },
                encoding: encoding,
                body: body
            };
            const url = getUrl(config, prefix + (id ? ('/' + id + (suffix ? ('/' + suffix) : '')) : '') + (urlArgs ? urlArgsToString(urlArgs) : ''));
            const response = yield request[method](url, options);
            if (response.errorMessage) {
                throw response;
            }
            else {
                return response;
            }
        });
    }
    raw.makeRequest = makeRequest;
})(raw = exports.raw || (exports.raw = {}));
//# sourceMappingURL=raw.js.map