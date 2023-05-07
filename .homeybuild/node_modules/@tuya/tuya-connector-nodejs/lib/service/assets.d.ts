import { TuyaOpenApiClient } from '../core/client';
import { TuyaResponse } from '../interfaces';
interface TuyaOpenApiAssetsGetParam {
    assetId: string;
}
interface TuyaOpenApiAssetsGetResult {
    assetId: string;
    parent_asset_id: string;
    asset_name: string;
    asset_full_name: string;
}
interface TuyaOpenApiAssetsListParam {
    assetId: string[];
}
interface TuyaOpenApiAssetsListResult {
    assetId: string;
    parent_asset_id: string;
    asset_name: string;
    asset_full_name: string;
}
interface TuyaOpenApiAssetsChildAssetsParam {
    asset_id: string;
    last_row_key?: string;
    page_size: number;
}
interface TuyaOpenApiAssetsChildAssetsResult {
    list: {
        asset_id: string;
        parent_asset_id: string;
        asset_name: string;
        asset_full_name: string;
    }[];
    page_size: string;
    has_next: boolean;
    last_row_key: string;
}
interface TuyaOpenApiAssetsDevicesParam {
    asset_id: string;
    last_row_key?: string;
    page_size: number;
}
interface TuyaOpenApiAssetsDevicesResult {
    list: {
        device_id: string;
        asset_id: string;
        asset_name: string;
    }[];
    last_row_key: string;
    page_size: string;
    has_next: boolean;
}
interface TuyaOpenApiAssetsAddParam {
    name: string;
    meta_id?: string;
    parent_asset_id?: string;
}
interface TuyaOpenApiAssetsUpdateParam {
    asset_id: string;
    name: string;
    meta_id?: string;
}
interface TuyaOpenApiAssetsDeleteParam {
    asset_id: string;
}
declare class TuyaOpenApiAssetsService {
    private client;
    constructor(client: TuyaOpenApiClient);
    get(param: TuyaOpenApiAssetsGetParam): Promise<TuyaResponse<TuyaOpenApiAssetsGetResult>>;
    assets(param: TuyaOpenApiAssetsListParam): Promise<TuyaResponse<TuyaOpenApiAssetsListResult>>;
    childAssets(param: TuyaOpenApiAssetsChildAssetsParam): Promise<TuyaResponse<TuyaOpenApiAssetsChildAssetsResult>>;
    devices(param: TuyaOpenApiAssetsDevicesParam): Promise<TuyaResponse<TuyaOpenApiAssetsDevicesResult>>;
    add(param: TuyaOpenApiAssetsAddParam): Promise<TuyaResponse<string>>;
    update(param: TuyaOpenApiAssetsUpdateParam): Promise<TuyaResponse<boolean>>;
    delete(param: TuyaOpenApiAssetsDeleteParam): Promise<TuyaResponse<boolean>>;
}
export { TuyaOpenApiAssetsService, };
export default TuyaOpenApiAssetsService;
