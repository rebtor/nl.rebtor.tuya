"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuyaOpenApiClient = void 0;
var qs = __importStar(require("qs"));
var crypto = __importStar(require("crypto"));
var axios_1 = __importDefault(require("axios"));
var tuyaTokenStore_1 = require("./tuyaTokenStore");
/**
 * TuyaContext.
 */
var TuyaOpenApiClient = /** @class */ (function () {
    function TuyaOpenApiClient(opt) {
        this.baseUrl = opt.baseUrl;
        this.accessKey = opt.accessKey;
        this.secretKey = opt.secretKey;
        this.store = opt.store || new tuyaTokenStore_1.MemoryStore();
        this.rpc = opt.rpc || axios_1.default;
        this.version = opt.version || 'v2';
    }
    TuyaOpenApiClient.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var t, headers, _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        t = Date.now().toString();
                        headers = {};
                        _a = this.version;
                        switch (_a) {
                            case 'v1': return [3 /*break*/, 1];
                            case 'v2': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.getHeader(t, true)];
                    case 2:
                        headers = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.getHeaderV2(t, true, {}, {})];
                    case 4:
                        headers = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, this.rpc({
                            url: this.baseUrl + "/v1.0/token?grant_type=1",
                            method: 'GET',
                            headers: headers,
                        })];
                    case 6:
                        data = (_b.sent()).data;
                        if (!data.success) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.store.setTokens(data.result)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, data];
                    case 8: throw new Error("GET_TOKEN_FAILED " + data.code + ", " + data.msg);
                }
            });
        });
    };
    TuyaOpenApiClient.prototype.refreshToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var t, refreshToken, api, headers, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = Date.now().toString();
                        return [4 /*yield*/, this.store.getRefreshToken()];
                    case 1:
                        refreshToken = _a.sent();
                        api = this.baseUrl + "/v1.0/token/" + refreshToken;
                        return [4 /*yield*/, this.getHeader(t, true)];
                    case 2:
                        headers = _a.sent();
                        return [4 /*yield*/, this.rpc.request({
                                url: api,
                                method: 'GET',
                                headers: headers,
                            })];
                    case 3:
                        data = (_a.sent()).data;
                        if (!!data.success) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.init()];
                    case 4:
                        data = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.store.setTokens(data.result)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 请求开放平台接口
     *
     * @param path    接口路径
     * @param method  Http方法
     * @param query   可选参数
     * @param body    可选参数
     * @param headers 可选请求头
     * @param retry   失败是否重试一次，默认true
     */
    TuyaOpenApiClient.prototype.request = function (_a) {
        var path = _a.path, method = _a.method, _b = _a.body, body = _b === void 0 ? {} : _b, _c = _a.query, query = _c === void 0 ? {} : _c, _d = _a.headers, headers = _d === void 0 ? {} : _d, _e = _a.retry, retry = _e === void 0 ? true : _e;
        return __awaiter(this, void 0, void 0, function () {
            var t, reqHeaders, _f, url, _g, encodePath, signHeaders, param, res;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        t = Date.now().toString();
                        _f = this.version;
                        switch (_f) {
                            case 'v1': return [3 /*break*/, 1];
                            case 'v2': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.getHeader(t, false)];
                    case 2:
                        reqHeaders = _h.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.getHeaderV2(t, false, headers, body)];
                    case 4:
                        reqHeaders = _h.sent();
                        _h.label = 5;
                    case 5:
                        url = "" + this.baseUrl + path;
                        if (!(this.version === 'v2')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getSignHeaders(path, method, query, body)];
                    case 6:
                        _g = _h.sent(), encodePath = _g.path, signHeaders = __rest(_g, ["path"]);
                        reqHeaders = Object.assign(reqHeaders, signHeaders);
                        url = "" + this.baseUrl + encodePath;
                        _h.label = 7;
                    case 7:
                        param = {
                            url: url,
                            method: method,
                            params: {},
                            data: body,
                            headers: Object.assign(reqHeaders, headers),
                        };
                        return [4 /*yield*/, this.rpc.request(param)];
                    case 8:
                        res = _h.sent();
                        if (!(retry && !res.data.success && res.data.code === 1010)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.refreshToken()];
                    case 9:
                        _h.sent();
                        return [4 /*yield*/, this.request({ path: path, method: method, query: query, body: body, headers: headers, retry: false })];
                    case 10:
                        res = _h.sent();
                        _h.label = 11;
                    case 11: return [2 /*return*/, res];
                }
            });
        });
    };
    TuyaOpenApiClient.prototype.getSignHeaders = function (path, method, query, body) {
        return __awaiter(this, void 0, void 0, function () {
            var t, _a, uri, pathQuery, queryMerged, sortedQuery, querystring, url, accessToken, contentHash, stringToSign, signStr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        t = Date.now().toString();
                        _a = path.split('?'), uri = _a[0], pathQuery = _a[1];
                        queryMerged = Object.assign(query, qs.parse(pathQuery));
                        sortedQuery = {};
                        Object.keys(queryMerged).sort().forEach(function (i) { return sortedQuery[i] = query[i]; });
                        querystring = qs.stringify(sortedQuery);
                        url = querystring ? uri + "?" + querystring : uri;
                        return [4 /*yield*/, this.store.getAccessToken()];
                    case 1:
                        accessToken = (_b.sent()) || '';
                        if (!!accessToken) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.init()];
                    case 2:
                        _b.sent(); // 未获取到 accessToke 时, 重新初始化
                        return [4 /*yield*/, this.store.getAccessToken()];
                    case 3:
                        accessToken = (_b.sent()) || '';
                        _b.label = 4;
                    case 4:
                        contentHash = crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex');
                        stringToSign = [method, contentHash, '', decodeURIComponent(url)].join('\n');
                        signStr = this.accessKey + accessToken + t + stringToSign;
                        return [2 /*return*/, {
                                t: t,
                                path: url,
                                client_id: this.accessKey,
                                sign: this.sign(signStr, this.secretKey),
                                sign_method: "HMAC-SHA256",
                                access_token: accessToken,
                                Dev_channel: 'SaaSFramework',
                                Dev_lang: 'Nodejs',
                            }];
                }
            });
        });
    };
    /**
     * 计算刷新 token 的签名
     *
     * @param {string} t 时间戳, 毫秒级
     * @returns {string} token 签名值
     */
    TuyaOpenApiClient.prototype.refreshSign = function (t) {
        var str = "" + this.accessKey + t;
        return this.sign(str, this.secretKey);
    };
    TuyaOpenApiClient.prototype.refreshSignV2 = function (t, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var nonce, method, signUrl, contentHash, signHeaders, signHeaderStr, stringToSign, signStr;
            return __generator(this, function (_a) {
                nonce = '';
                method = 'GET';
                signUrl = '/v1.0/token?grant_type=1';
                contentHash = crypto.createHash('sha256').update('').digest('hex');
                signHeaders = Object.keys(headers);
                signHeaderStr = Object.keys(signHeaders).reduce(function (pre, cur, idx) {
                    return "" + pre + cur + ":" + headers[cur] + (idx === signHeaders.length - 1 ? '' : '\n');
                }, '');
                stringToSign = [method, contentHash, signHeaderStr, signUrl].join('\n');
                signStr = this.accessKey + t + nonce + stringToSign;
                return [2 /*return*/, {
                        sign: this.sign(signStr, this.secretKey),
                        signHeaders: signHeaders.join(':'),
                    }];
            });
        });
    };
    /**
     * 获取已有签名(过期则重新获取)
     *
     * @param {string} t 时间戳，毫秒级
     * @returns {string} token 签名值
     */
    TuyaOpenApiClient.prototype.requestSign = function (t) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, str;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.store.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        if (!!accessToken) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.init()];
                    case 2:
                        _a.sent(); // 未获取到 accessToke 时, 重新初始化
                        return [4 /*yield*/, this.store.getAccessToken()];
                    case 3:
                        accessToken = _a.sent();
                        _a.label = 4;
                    case 4:
                        str = "" + this.accessKey + accessToken + t;
                        return [2 /*return*/, this.sign(str, this.secretKey)];
                }
            });
        });
    };
    TuyaOpenApiClient.prototype.requestSignV2 = function (t, headers, body) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, nonce, method, signUrl, bodyStr, contentHash, signHeaders, signHeaderStr, stringToSign, signStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.store.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        if (!!accessToken) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.init()];
                    case 2:
                        _a.sent(); // 未获取到 accessToke 时, 重新初始化
                        return [4 /*yield*/, this.store.getAccessToken()];
                    case 3:
                        accessToken = _a.sent();
                        _a.label = 4;
                    case 4:
                        nonce = '';
                        method = 'GET';
                        signUrl = '/v1.0/token?grant_type=1';
                        bodyStr = JSON.stringify(body);
                        contentHash = crypto.createHash('sha256').update(bodyStr).digest('hex');
                        signHeaders = Object.keys(headers);
                        signHeaderStr = Object.keys(signHeaders).reduce(function (pre, cur, idx) {
                            return "" + pre + cur + ":" + headers[cur] + (idx === signHeaders.length - 1 ? '' : '\n');
                        }, '');
                        stringToSign = [method, contentHash, signHeaderStr, signUrl].join('\n');
                        signStr = this.accessKey + accessToken + t + nonce + stringToSign;
                        return [2 /*return*/, {
                                sign: this.sign(signStr, this.secretKey),
                                signHeaders: signHeaders.join(':'),
                            }];
                }
            });
        });
    };
    TuyaOpenApiClient.prototype.sign = function (str, secret) {
        return crypto
            .createHmac('sha256', secret)
            .update(str, 'utf8')
            .digest('hex')
            .toUpperCase();
    };
    /**
     * 获取签名后的 headers
     *
     * @param {string} t
     * @param {boolean} forRefresh
     */
    TuyaOpenApiClient.prototype.getHeader = function (t, forRefresh) {
        if (forRefresh === void 0) { forRefresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var sign, _a, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!forRefresh) return [3 /*break*/, 1];
                        _a = this.refreshSign(t);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.requestSign(t)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        sign = _a;
                        return [4 /*yield*/, this.store.getAccessToken()];
                    case 4:
                        accessToken = _b.sent();
                        return [2 /*return*/, {
                                t: t,
                                sign: sign,
                                client_id: this.accessKey,
                                sign_method: "HMAC-SHA256",
                                access_token: accessToken || '',
                                Dev_lang: 'Nodejs',
                                Dev_channel: 'SaaSFramework',
                            }];
                }
            });
        });
    };
    TuyaOpenApiClient.prototype.getHeaderV2 = function (t, forRefresh, headers, body) {
        if (forRefresh === void 0) { forRefresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, sign, signHeaders, _b, accessToken;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!forRefresh) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.refreshSignV2(t, headers)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.requestSignV2(t, headers, body)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        _a = _b, sign = _a.sign, signHeaders = _a.signHeaders;
                        return [4 /*yield*/, this.store.getAccessToken()];
                    case 5:
                        accessToken = _c.sent();
                        return [2 /*return*/, {
                                t: t,
                                sign: sign,
                                client_id: this.accessKey,
                                sign_method: "HMAC-SHA256",
                                access_token: accessToken || '',
                                Dev_lang: 'Nodejs',
                                Dev_channel: 'SaaSFramework',
                                'Signature-Headers': signHeaders,
                            }];
                }
            });
        });
    };
    return TuyaOpenApiClient;
}());
exports.TuyaOpenApiClient = TuyaOpenApiClient;
exports.default = TuyaOpenApiClient;
//# sourceMappingURL=client.js.map