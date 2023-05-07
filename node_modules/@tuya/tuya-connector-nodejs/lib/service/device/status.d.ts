import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';
interface DeviceStatusServiceStatusParam {
    device_id: string;
}
interface DeviceStatusServiceStatusResult {
    code: string;
    value: string;
}
interface DeviceStatusServiceStatusListParam {
    device_ids: string[];
}
interface DeviceStatusServiceStatusListResult {
    id: string;
    status: {
        code: string;
        value: string;
    }[];
}
declare class TuyaOpenApiDeviceStatusService {
    private client;
    constructor(client: TuyaOpenApiClient);
    status(param: DeviceStatusServiceStatusParam): Promise<TuyaResponse<DeviceStatusServiceStatusResult>>;
    statusList(param: DeviceStatusServiceStatusListParam): Promise<TuyaResponse<DeviceStatusServiceStatusListResult>>;
}
export { TuyaOpenApiDeviceStatusService };
export default TuyaOpenApiDeviceStatusService;
