/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Identity_IdentityLdapSettingsDto } from '../models/Volo_Abp_Identity_IdentityLdapSettingsDto';
import type { Volo_Abp_Identity_IdentityOAuthSettingsDto } from '../models/Volo_Abp_Identity_IdentityOAuthSettingsDto';
import type { Volo_Abp_Identity_IdentitySettingsDto } from '../models/Volo_Abp_Identity_IdentitySettingsDto';
import type { Volo_Chat_Settings_ChatSettingsDto } from '../models/Volo_Chat_Settings_ChatSettingsDto';
import type { Volo_Chat_Settings_SendOnEnterSettingDto } from '../models/Volo_Chat_Settings_SendOnEnterSettingDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SettingsService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postSettingsSendOnEnter({
        requestBody,
    }: {
        requestBody?: Volo_Chat_Settings_SendOnEnterSettingDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/settings/send-on-enter',
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
     * @returns Volo_Chat_Settings_ChatSettingsDto Success
     * @throws ApiError
     */
    public static getSettings(): CancelablePromise<Volo_Chat_Settings_ChatSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/settings',
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
        requestBody?: Volo_Chat_Settings_ChatSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/chat/settings',
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
     * @returns Volo_Abp_Identity_IdentitySettingsDto Success
     * @throws ApiError
     */
    public static getSettings1(): CancelablePromise<Volo_Abp_Identity_IdentitySettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/settings',
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
    public static putSettings1({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_IdentitySettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/settings',
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
     * @returns Volo_Abp_Identity_IdentityLdapSettingsDto Success
     * @throws ApiError
     */
    public static getSettingsLdap(): CancelablePromise<Volo_Abp_Identity_IdentityLdapSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/settings/ldap',
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
    public static putSettingsLdap({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_IdentityLdapSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/settings/ldap',
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
     * @returns Volo_Abp_Identity_IdentityOAuthSettingsDto Success
     * @throws ApiError
     */
    public static getSettingsOauth(): CancelablePromise<Volo_Abp_Identity_IdentityOAuthSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/settings/oauth',
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
    public static putSettingsOauth({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_IdentityOAuthSettingsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/settings/oauth',
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
