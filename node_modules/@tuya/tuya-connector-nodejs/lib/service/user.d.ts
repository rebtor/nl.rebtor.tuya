import { TuyaOpenApiClient } from '../core/client';
import { TuyaResponse } from '../interfaces';
interface TuyaOpenApiUserGetParam {
    user_id: string;
}
interface TuyaOpenApiUserGetResult {
    user_id: string;
    user_name: string;
    country_code: string;
}
interface TuyaOpenApiUserRegisterParam {
    username: string;
    password: string;
    country_code: string;
}
interface TuyaOpenApiUserRegisterResult {
    user_id: string;
}
interface TuyaOpenApiUserDeleteParam {
    user_id: string;
}
interface TuyaOpenApiUserChangePasswordParam {
    user_id: string;
    old_password: string;
    new_password: string;
}
interface TuyaOpenApiUserUsersParam {
    last_row_key?: string;
    page_size?: number;
}
declare class TuyaOpenApiUserService {
    private client;
    constructor(client: TuyaOpenApiClient);
    getUser(param: TuyaOpenApiUserGetParam): Promise<TuyaResponse<TuyaOpenApiUserGetResult>>;
    registerUser(param: TuyaOpenApiUserRegisterParam): Promise<TuyaResponse<TuyaOpenApiUserRegisterResult>>;
    deleteUser(param: TuyaOpenApiUserDeleteParam): Promise<TuyaResponse<boolean>>;
    changePassword(param: TuyaOpenApiUserChangePasswordParam): Promise<TuyaResponse<boolean>>;
    users(param: TuyaOpenApiUserUsersParam): Promise<TuyaResponse<TuyaOpenApiUserUsersParam>>;
}
export { TuyaOpenApiUserService };
export default TuyaOpenApiUserService;
