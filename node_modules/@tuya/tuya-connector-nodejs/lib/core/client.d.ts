import { AxiosInstance, Method, AxiosResponse } from 'axios';
import { TuyaTokenStorInterface, TuyaResponse, TuyaResponseGetToken, TuyaResponseRefreshToken } from '../interfaces';
import { TuyaContextOptions } from '../interfaces';
interface TuyaOpenApiClientOptions extends TuyaContextOptions {
    baseUrl: string;
    accessKey: string;
    secretKey: string;
    store?: TuyaTokenStorInterface;
    rpc?: AxiosInstance;
}
interface TuyaOpenApiClientRequestExtHeader {
    t: string;
    client_id: string;
    sign_method: 'HMAC-SHA256';
    sign: string;
    access_token: string;
    Dev_channel: string;
    Dev_lang: string;
    path?: string;
    'Signature-Headers'?: string;
}
export interface TuyaOpenApiClientRequestQueryBase {
    [k: string]: any;
}
export interface TuyaOpenApiClientRequestBodyBase {
    [k: string]: any;
}
export interface TuyaOpenApiClientRequestHeaderBase {
    [k: string]: string;
}
export interface TuyaOpenApiClientRequestOptions {
    path: string;
    method: Method;
    body?: TuyaOpenApiClientRequestBodyBase;
    headers?: TuyaOpenApiClientRequestHeaderBase;
    query?: TuyaOpenApiClientRequestQueryBase;
    retry?: boolean;
}
/**
 * TuyaOpenApiResCode.
 *
 * https://developer.tuya.com/cn/docs/iot/open-api/api-reference/error-code/error-code?id=K989ruxx88swc
 */
declare type TuyaOpenApiResCode = 500 | 1000 | 1010;
interface TuyaOpenApiResponse<T> {
    code: TuyaOpenApiResCode;
    success: boolean;
    msg: null | string;
    result: T;
}
/**
 * TuyaContext.
 */
declare class TuyaOpenApiClient {
    private readonly baseUrl;
    private readonly accessKey;
    private readonly secretKey;
    private readonly store;
    private readonly rpc;
    private readonly version;
    constructor(opt: TuyaOpenApiClientOptions);
    init(): Promise<TuyaResponse<TuyaResponseGetToken>>;
    refreshToken(): Promise<TuyaResponse<TuyaResponseRefreshToken>>;
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
    request<T>({ path, method, body, query, headers, retry, }: TuyaOpenApiClientRequestOptions): Promise<AxiosResponse<TuyaOpenApiResponse<T>>>;
    getSignHeaders(path: string, method: string, query: TuyaOpenApiClientRequestQueryBase, body: TuyaOpenApiClientRequestBodyBase): Promise<TuyaOpenApiClientRequestExtHeader>;
    /**
     * 计算刷新 token 的签名
     *
     * @param {string} t 时间戳, 毫秒级
     * @returns {string} token 签名值
     */
    refreshSign(t: string): string;
    refreshSignV2(t: string, headers: TuyaOpenApiClientRequestHeaderBase): Promise<{
        sign: string;
        signHeaders: string;
    }>;
    /**
     * 获取已有签名(过期则重新获取)
     *
     * @param {string} t 时间戳，毫秒级
     * @returns {string} token 签名值
     */
    requestSign(t: string): Promise<string>;
    requestSignV2(t: string, headers: TuyaOpenApiClientRequestHeaderBase, body: TuyaOpenApiClientRequestBodyBase): Promise<{
        sign: string;
        signHeaders: string;
    }>;
    sign(str: string, secret: string): string;
    /**
     * 获取签名后的 headers
     *
     * @param {string} t
     * @param {boolean} forRefresh
     */
    getHeader(t: string, forRefresh?: boolean): Promise<TuyaOpenApiClientRequestExtHeader>;
    getHeaderV2(t: string, forRefresh: boolean | undefined, headers: TuyaOpenApiClientRequestHeaderBase, body: TuyaOpenApiClientRequestBodyBase): Promise<TuyaOpenApiClientRequestExtHeader>;
}
export default TuyaOpenApiClient;
export { TuyaOpenApiClientOptions, TuyaOpenApiClient, };
