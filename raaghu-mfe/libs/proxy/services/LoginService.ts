/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_AbpLoginResult } from '../models/Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_AbpLoginResult';
import type { Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_LinkUserLoginInfo } from '../models/Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_LinkUserLoginInfo';
import type { Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_UserLoginInfo } from '../models/Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_UserLoginInfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LoginService {

    /**
     * @returns Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_AbpLoginResult Success
     * @throws ApiError
     */
    public static postLogin({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_UserLoginInfo,
    }): CancelablePromise<Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_AbpLoginResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/login',
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
     * @returns Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_AbpLoginResult Success
     * @throws ApiError
     */
    public static postLinkLogin({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_LinkUserLoginInfo,
    }): CancelablePromise<Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_AbpLoginResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/linkLogin',
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
    public static getLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/logout',
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
     * @returns Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_AbpLoginResult Success
     * @throws ApiError
     */
    public static postCheckPassword({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_UserLoginInfo,
    }): CancelablePromise<Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_AbpLoginResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/checkPassword',
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
