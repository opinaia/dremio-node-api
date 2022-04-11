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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAPI = exports.getDatasetsFromSQL = exports.createFirstUser = void 0;
const raw_1 = require("./raw");
const parser_1 = require("./parser");
function poll(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}
function canonicaliseUser(user, password) {
    return Object.assign({
        password: password,
        createdAt: !user.createdAt ? new Date().getTime() : typeof user.createdAt === 'number' ? user.createdAt : typeof user.createdAt === 'string' ? parseInt(user.createdAt) : user.createdAt.getTime()
    }, user);
}
function convertRawUser(rawUser) {
    const eu = Object.assign({}, rawUser.userConfig);
    eu.createdAt = new Date(rawUser.userConfig.createdAt);
    eu.modifiedAt = new Date(rawUser.userConfig.modifiedAt);
    return eu;
}
function createFirstUser(config, user, password) {
    return raw_1.raw.makeRequest(config, 'put', '_dremionull', raw_1.raw.FIRST_USER, null, null, null, JSON.stringify(canonicaliseUser(user, password)), null); //Buffer.from(JSON.stringify(canonicaliseUser(user, password))).toString('base64'))
}
exports.createFirstUser = createFirstUser;
function getDatasetsFromSQL(sql) {
    function getTableReferences(ast) {
        let tableReferences = [];
        Object.keys(ast).forEach(k => {
            const v = ast[k];
            if (v !== null) {
                if (v['type'] && v['type'] === 'TableFactor') {
                    const ref = v['value']['value'];
                    let i = 0;
                    const refArr = [];
                    while (i < ref.length) {
                        if (ref.charAt(i) === '"') {
                            const secondQuote = ref.substring(i + 1).indexOf('"');
                            refArr.push(ref.substr(i + 1, secondQuote));
                            i += secondQuote + 3;
                        }
                        else {
                            const dot = ref.substring(i).indexOf('.');
                            if (dot === -1) {
                                refArr.push(ref.substr(i));
                                i = ref.length;
                            }
                            else {
                                refArr.push(ref.substr(i, dot));
                                i += dot + 1;
                            }
                        }
                    }
                    tableReferences.push(refArr);
                }
                else if (Array.isArray(v)) {
                    v.forEach(v => {
                        tableReferences = tableReferences.concat(getTableReferences(v));
                    });
                }
                else if (!(typeof v === 'string') && !(typeof v === 'boolean') && !(typeof v === 'number')) {
                    tableReferences = tableReferences.concat(getTableReferences(v));
                }
            }
        });
        return tableReferences;
    }
    const ast = (0, parser_1.parse)(sql);
    return getTableReferences(ast);
}
exports.getDatasetsFromSQL = getDatasetsFromSQL;
function createAPI(config, login) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = '_dremio' + (yield raw_1.raw.makeRequest(config, 'post', null, raw_1.raw.LOGIN, null, null, null, login)).token;
        const api = {
            token: token,
            user: {
                createUser(user, password) {
                    return raw_1.raw.makeRequest(config, 'put', token, raw_1.raw.USER, encodeURIComponent(user.userName), null, null, JSON.stringify(canonicaliseUser(user, password)), null);
                },
                getUsers(filter) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const users = yield (filter ?
                            raw_1.raw.makeRequest(config, 'get', token, raw_1.raw.USERS, 'search', null, { filter: encodeURIComponent(filter) }, null) :
                            raw_1.raw.makeRequest(config, 'get', token, raw_1.raw.USERS, 'all', null, null, null));
                        return users.users.map(convertRawUser);
                    });
                },
                getUser(userName) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return convertRawUser(yield raw_1.raw.makeRequest(config, 'get', token, raw_1.raw.USER, userName, null, null, null));
                    });
                },
                // TODO: Finish
            },
            catalog: {
                getAllTopLevelContainers() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return (yield raw_1.raw.makeRequest(config, 'get', token, raw_1.raw.CATALOG, null, null, null, null)).data;
                    });
                },
                getEntity(id) {
                    return raw_1.raw.makeRequest(config, 'get', token, raw_1.raw.CATALOG, id, null, null, null);
                },
                createEntity(catalog) {
                    return raw_1.raw.makeRequest(config, 'post', token, raw_1.raw.CATALOG, null, null, null, catalog);
                }
                // TODO: Finish
            },
            reflection: {
            // TODO
            },
            job: {
                getStatus(jobId) {
                    return raw_1.raw.makeRequest(config, 'get', token, raw_1.raw.JOB, jobId, null, null, null);
                },
                getResults(jobId, offset, limit) {
                    return raw_1.raw.makeRequest(config, 'get', token, raw_1.raw.JOB, jobId, 'results', {
                        offset: offset,
                        limit: limit
                    }, null);
                }
            },
            source: {
                getSources() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return (yield raw_1.raw.makeRequest(config, 'get', token, raw_1.raw.SOURCE, null, null, null, null)).data;
                    });
                },
                getSource(id) {
                    return raw_1.raw.makeRequest(config, 'get', token, raw_1.raw.SOURCE, id, null, null, null);
                },
                createSource(source) {
                    return raw_1.raw.makeRequest(config, 'post', token, raw_1.raw.SOURCE, null, null, null, source);
                }
                // TODO: Finish
            },
            sql: {
                runQuery(sql) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return (yield raw_1.raw.makeRequest(config, 'post', token, raw_1.raw.SQL, null, null, null, {
                            sql: sql
                        })).id;
                    });
                },
                runQueryAndGetResults(sql, pollTime = 10, offset = 0, limit = 500, _timeout) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const jobId = yield api.sql.runQuery(sql);
                        const start = new Date().getTime();
                        const timeout = _timeout === undefined ? undefined : _timeout * 1000;
                        while (true) {
                            yield poll(pollTime);
                            const status = yield api.job.getStatus(jobId);
                            if (status.jobState === 'CANCELED') {
                                throw new Error(`Job ${jobId} has been canceled`);
                            }
                            if (status.jobState === 'COMPLETED') {
                                return yield api.job.getResults(jobId, offset, limit);
                            }
                            if (timeout !== undefined) {
                                if (new Date().getTime() > (start + timeout)) {
                                    throw `Query timed out after ${_timeout} seconds: ${sql}`;
                                }
                            }
                        }
                    });
                }
            }
        };
        return api;
    });
}
exports.createAPI = createAPI;
//# sourceMappingURL=api.js.map