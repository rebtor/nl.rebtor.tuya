import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';
interface DeviceLogServiceLogParam {
    device_id: string;
    event_types: string;
    start_time: number;
    end_time: number;
    codes?: string;
    last_row_key?: string;
    size?: number;
    query_type?: 1 | 2;
}
interface DeviceLogServiceLogResult {
    logs: {
        code: string;
        value: string;
        event_time: string;
        event_from: string;
        event_id: string;
    }[];
    has_next: boolean;
    device_id: string;
    last_row_key: string;
    count: number;
}
interface DeviceLogServiceReportParam {
    device_id: string;
    start_time: number;
    end_time: number;
    codes: string[];
    last_row_key?: string;
    size?: number;
}
interface DeviceLogServiceReportResult {
    device_id: string;
    has_more: boolean;
    last_row_key: string;
    total: number;
    logs: {
        code: string;
        value: string;
        event_time: number;
    }[];
}
declare class TuyaOpenApiDeviceLogService {
    private client;
    constructor(client: TuyaOpenApiClient);
    logs(param: DeviceLogServiceLogParam): Promise<TuyaResponse<DeviceLogServiceLogResult>>;
    report(param: DeviceLogServiceReportParam): Promise<TuyaResponse<DeviceLogServiceReportResult>>;
}
export { TuyaOpenApiDeviceLogService };
export default TuyaOpenApiDeviceLogService;
