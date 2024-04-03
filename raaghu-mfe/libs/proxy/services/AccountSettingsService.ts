/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Account_AccountExternalProviderSettingsDto } from '../models/Volo_Abp_Account_AccountExternalProviderSettingsDto';
import type { Volo_Abp_Account_AccountRecaptchaSettingsDto } from '../models/Volo_Abp_Account_AccountRecaptchaSettingsDto';
import type { Volo_Abp_Account_AccountSettingsDto } from '../models/Volo_Abp_Account_AccountSettingsDto';
import type { Volo_Abp_Account_AccountTwoFactorSettingsDto } from '../models/Volo_Abp_Account_AccountTwoFactorSettingsDto';
import type { Volo_Abp_Account_UpdateExternalProviderDto } from '../models/Volo_Abp_Account_UpdateExternalProviderDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountSettingsService {

    /**
     * @returns Volo_Abp_Account_AccountSettingsDto Success
     * @throws ApiError
     */
    public static getSettings(): CancelablePromise<Volo_Abp_Account_AccountSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account-admin/settings',
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
    public static putSettings({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_AccountSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/account-admin/settings',
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
     * @returns Volo_Abp_Account_AccountTwoFactorSettingsDto Success
     * @throws ApiError
     */
    public static getSettingsTwoFactor(): CancelablePromise<Volo_Abp_Account_AccountTwoFactorSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account-admin/settings/two-factor',
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
    public static putSettingsTwoFactor({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_AccountTwoFactorSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/account-admin/settings/two-factor',
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
     * @returns Volo_Abp_Account_AccountRecaptchaSettingsDto Success
     * @throws ApiError
     */
    public static getSettingsRecaptcha(): CancelablePromise<Volo_Abp_Account_AccountRecaptchaSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account-admin/settings/recaptcha',
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
    public static putSettingsRecaptcha({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_AccountRecaptchaSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/account-admin/settings/recaptcha',
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
     * @returns Volo_Abp_Account_AccountExternalProviderSettingsDto Success
     * @throws ApiError
     */
    public static getSettingsExternalProvider(): CancelablePromise<Volo_Abp_Account_AccountExternalProviderSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account-admin/settings/external-provider',
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
    public static putSettingsExternalProvider({
        requestBody,
    }: {
        requestBody?: Array<Volo_Abp_Account_UpdateExternalProviderDto>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/account-admin/settings/external-provider',
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
