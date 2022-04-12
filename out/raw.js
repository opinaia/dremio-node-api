"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw = void 0;
const axios_1 = __importDefault(require("axios"));
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
            const url = getUrl(config, prefix + (id ? ('/' + id + (suffix ? ('/' + suffix) : '')) : '') + (urlArgs ? urlArgsToString(urlArgs) : ''));
            const options = {
                url,
                method: method,
                headers: token === null ? undefined : {
                    Authorization: token,
                    'Content-type': 'application/json'
                },
                responseEncoding: encoding,
                data: body
            };
            const response = yield (0, axios_1.default)(options);
            if (response.data.errorMessage) {
                throw new Error(response.data.errorMessage);
            }
            else {
                return response.data;
            }
        });
    }
    raw.makeRequest = makeRequest;
})(raw = exports.raw || (exports.raw = {}));
//# sourceMappingURL=raw.js.map