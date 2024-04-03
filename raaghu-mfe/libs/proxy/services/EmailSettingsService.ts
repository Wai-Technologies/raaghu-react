/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_SettingManagement_EmailSettingsDto } from '../models/Volo_Abp_SettingManagement_EmailSettingsDto';
import type { Volo_Abp_SettingManagement_SendTestEmailInput } from '../models/Volo_Abp_SettingManagement_SendTestEmailInput';
import type { Volo_Abp_SettingManagement_UpdateEmailSettingsDto } from '../models/Volo_Abp_SettingManagement_UpdateEmailSettingsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EmailSettingsService {

    /**
     * @returns Volo_Abp_SettingManagement_EmailSettingsDto Success
     * @throws ApiError
     */
    public static getEmailing(): CancelablePromise<Volo_Abp_SettingManagement_EmailSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/setting-management/emailing',
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
    public static postEmailing({
        requestBody,
    }: {
        requestBody?: Volo_Abp_SettingManagement_UpdateEmailSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setting-management/emailing',
            body: requestBody,
            mediaType: 'application/json',
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
    public static postEmailingSendTestEmail({
        requestBody,
    }: {
        requestBody?: Volo_Abp_SettingManagement_SendTestEmailInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setting-management/emailing/send-test-email',
            body: requestBody,
            mediaType: 'application/json',
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
