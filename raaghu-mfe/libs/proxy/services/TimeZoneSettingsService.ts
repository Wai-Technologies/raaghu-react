/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_NameValue } from '../models/Volo_Abp_NameValue';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TimeZoneSettingsService {

    /**
     * @returns string Success
     * @throws ApiError
     */
    public static getTimezone(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/setting-management/timezone',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postTimezone({
        timezone,
    }: {
        timezone?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setting-management/timezone',
            query: {
                'timezone': timezone,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @returns Volo_Abp_NameValue Success
     * @throws ApiError
     */
    public static getTimezoneTimezones(): CancelablePromise<Array<Volo_Abp_NameValue>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/setting-management/timezone/timezones',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

}
