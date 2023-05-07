import { TuyaOpenApiClient, TuyaOpenApiClientRequestOptions } from './core';
import { TuyaContextOptions, TuyaResponse } from './interfaces';
import { TuyaOpenApiUserService, TuyaOpenApiAssetsService, TuyaOpenApiDeviceService, TuyaOpenApiDeviceFunctionService, TuyaOpenApiDeviceRegistrationService, TuyaOpenApiDeviceLogService, TuyaOpenApiDeviceStatusService } from './service';
export declare class TuyaContext {
    readonly client: TuyaOpenApiClient;
    readonly user: TuyaOpenApiUserService;
    readonly assets: TuyaOpenApiAssetsService;
    readonly device: TuyaOpenApiDeviceService;
    readonly deviceFunction: TuyaOpenApiDeviceFunctionService;
    readonly deviceLogs: TuyaOpenApiDeviceLogService;
    readonly deviceRegistration: TuyaOpenApiDeviceRegistrationService;
    readonly deviceStatus: TuyaOpenApiDeviceStatusService;
    constructor(opt: TuyaContextOptions);
    request<T>(opt: TuyaOpenApiClientRequestOptions): Promise<TuyaResponse<T>>;
}
