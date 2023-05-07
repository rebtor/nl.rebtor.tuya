import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';
interface DeviceRegistrationTokenParam {
    pairing_type: 'ble' | 'ap' | 'ez';
    uid: string;
    time_zone_id: string;
    asset_id: string;
    extension?: {
        uuid: string;
    };
}
interface DeviceRegistrationTokenResult {
    expire_time: number;
    region: 'AY' | 'EU' | 'US';
    token: string;
    secret: string;
    extension: {
        encrypt_key: string;
        random: string;
    };
}
interface DeviceRegistrationUseTokenParam {
    token: string;
}
interface DeviceRegistrationUseTokenResult {
    success_devices: {
        device_id: string;
        product_id: string;
        name: string;
        category: string;
    }[];
    error_devices: {
        device_id: string;
        code: string;
        msg: string;
        name: string;
    }[];
}
interface DeviceRegistrationDiscoverParam {
    device_id: string;
    duration: number;
}
interface DeviceRegistrationStopDiscoverParam {
    device_id: string;
}
interface DeviceRegistrationSubDeviceParam {
    device_id: string;
    discovery_time: number;
}
interface DeviceRegistrationSubDeviceResult {
    id: string;
    name: string;
    asset_id: string;
    active_time: number;
    update_time: number;
    category: string;
    product_id: string;
    online: boolean;
}
declare class TuyaOpenApiDeviceRegistrationService {
    private client;
    constructor(client: TuyaOpenApiClient);
    createToken(param: DeviceRegistrationTokenParam): Promise<TuyaResponse<DeviceRegistrationTokenResult>>;
    token(param: DeviceRegistrationUseTokenParam): Promise<TuyaResponse<DeviceRegistrationUseTokenResult>>;
    discover(param: DeviceRegistrationDiscoverParam): Promise<TuyaResponse<boolean>>;
    stopDiscover(param: DeviceRegistrationStopDiscoverParam): Promise<TuyaResponse<boolean>>;
    subDevice(param: DeviceRegistrationSubDeviceParam): Promise<TuyaResponse<DeviceRegistrationSubDeviceResult[]>>;
}
export { TuyaOpenApiDeviceRegistrationService };
export default TuyaOpenApiDeviceRegistrationService;
