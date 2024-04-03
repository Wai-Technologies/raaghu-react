/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Account_ChangePasswordInput } from '../models/Volo_Abp_Account_ChangePasswordInput';
import type { Volo_Abp_Account_ProfileDto } from '../models/Volo_Abp_Account_ProfileDto';
import type { Volo_Abp_Account_UpdateProfileDto } from '../models/Volo_Abp_Account_UpdateProfileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProfileService {

    /**
     * @returns Volo_Abp_Account_ProfileDto Success
     * @throws ApiError
     */
    public static getMyProfile(): CancelablePromise<Volo_Abp_Account_ProfileDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/my-profile',
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
     * @returns Volo_Abp_Account_ProfileDto Success
     * @throws ApiError
     */
    public static putMyProfile({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_UpdateProfileDto,
    }): CancelablePromise<Volo_Abp_Account_ProfileDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/account/my-profile',
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
    public static postMyProfileChangePassword({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_ChangePasswordInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/my-profile/change-password',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static getMyProfileTwoFactorEnabled(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/my-profile/two-factor-enabled',
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
    public static postMyProfileSetTwoFactorEnabled({
        enabled,
    }: {
        enabled?: boolean,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/my-profile/set-two-factor-enabled',
            query: {
                'enabled': enabled,
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

}
