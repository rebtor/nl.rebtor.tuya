import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';
interface DeviceFunctionServiceCategoriesParam {
    category: 'kg' | 'cz' | 'dj' | string;
}
interface DeviceFunctionServiceCategoriesResult {
    category: string;
    functions: {
        code: string;
        type: string;
        values: string;
        name: string;
        desc: string;
    }[];
}
interface DeviceFunctionServiceDeviceParam {
    device_id: string;
}
interface DeviceFunctionServiceDeviceResult {
    category: string;
    functions: {
        code: string;
        type: string;
        values: string;
        name: string;
        desc: string;
    }[];
}
interface DeviceFunctionServiceSpecificationParam {
    device_id: string;
}
interface DeviceFunctionServiceSpecificationResult {
    category: string;
    functions: {
        code: string;
        type: string;
        values: string;
    }[];
    status: {
        code: string;
        type: string;
        values: string;
    }[];
}
interface DeviceFunctionServiceCommandParam {
    device_id: string;
    commands: {
        code: string;
        value: string | boolean | number;
    }[];
}
declare class TuyaOpenApiDeviceFunctionService {
    private client;
    constructor(client: TuyaOpenApiClient);
    categories(param: DeviceFunctionServiceCategoriesParam): Promise<TuyaResponse<DeviceFunctionServiceCategoriesResult>>;
    devices(param: DeviceFunctionServiceDeviceParam): Promise<TuyaResponse<DeviceFunctionServiceDeviceResult>>;
    specification(param: DeviceFunctionServiceSpecificationParam): Promise<TuyaResponse<DeviceFunctionServiceSpecificationResult>>;
    command(param: DeviceFunctionServiceCommandParam): Promise<TuyaResponse<boolean>>;
}
export { TuyaOpenApiDeviceFunctionService };
export default TuyaOpenApiDeviceFunctionService;
