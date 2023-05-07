import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';
interface DeviceServiceDetailParam {
    device_id: string;
}
interface DeviceServiceDetailResult {
    id: string;
    name: string;
    uid: string;
    local_key: string;
    category: string;
    product_id: string;
    product_name: string;
    sub: boolean;
    uuid: string;
    asset_id: string;
    online: boolean;
    active_time: number;
    icon: string;
    ip: string;
}
interface DeviceServiceListParam {
    device_ids?: string[];
}
interface DeviceServiceListResult {
    total: number;
    has_more: boolean;
    devices: {
        id: string;
        uid: string;
        local_key: string;
        category: string;
        product_id: string;
        sub: boolean;
        uuid: string;
        asset_id: string;
        online: boolean;
        name: string;
        ip: string;
        time_zone: string;
        create_time: number;
        update_time: number;
        active_time: number;
    }[];
}
interface DeviceServiceResetParam {
    device_id: string;
}
interface DeviceServiceDeleteParam {
    device_id: string;
}
interface DeviceServiceDeleteBatchParam {
    device_ids: string[];
}
interface DeviceServiceSubDeviceParam {
    device_id: string;
}
interface DeviceServiceSubDeviceResult {
    id: string;
    name: string;
    online: boolean;
    asset_id: string;
    category: string;
    produce_id: string;
    active_time: number;
    update_time: number;
}
interface DeviceServiceChangeNameParam {
    device_id: string;
    name: string;
}
interface DeviceServiceFreezeStateParam {
    device_id: string;
}
interface DeviceServiceFreezeStateResult {
    state: 0 | 1;
}
interface DeviceServiceChangeFreezeStateParam {
    device_id: string;
    state: 0 | 1;
}
interface DeviceServiceAssetDevicesParam {
    asset_id: string;
}
interface DeviceServiceAssetDevicesResult {
    id: string;
}
declare class TuyaOpenApiDeviceService {
    private client;
    constructor(client: TuyaOpenApiClient);
    detail(param: DeviceServiceDetailParam): Promise<TuyaResponse<DeviceServiceDetailResult>>;
    list(param?: DeviceServiceListParam): Promise<TuyaResponse<DeviceServiceListResult>>;
    reset(param: DeviceServiceResetParam): Promise<TuyaResponse<boolean>>;
    delete(param: DeviceServiceDeleteParam): Promise<TuyaResponse<boolean>>;
    deleteBatch(param: DeviceServiceDeleteBatchParam): Promise<TuyaResponse<boolean>>;
    subDevice(param: DeviceServiceSubDeviceParam): Promise<TuyaResponse<DeviceServiceSubDeviceResult[]>>;
    changeName(param: DeviceServiceChangeNameParam): Promise<TuyaResponse<boolean>>;
    freezeState(param: DeviceServiceFreezeStateParam): Promise<TuyaResponse<DeviceServiceFreezeStateResult>>;
    changeFreezeState(param: DeviceServiceChangeFreezeStateParam): Promise<TuyaResponse<boolean>>;
    assetDevices(param: DeviceServiceAssetDevicesParam): Promise<TuyaResponse<DeviceServiceAssetDevicesResult[]>>;
}
export { TuyaOpenApiDeviceService };
export default TuyaOpenApiDeviceService;
