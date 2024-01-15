/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Abp_Users_UserData } from '../models/Volo_Abp_Users_UserData';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserLookupService {

    /**
     * @returns Volo_Abp_Users_UserData Success
     * @throws ApiError
     */
    public static getUsersLookup({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_Users_UserData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/lookup/{id}',
            path: {
                'id': id,
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
     * @returns Volo_Abp_Users_UserData Success
     * @throws ApiError
     */
    public static getUsersLookupByUsername({
        userName,
    }: {
        userName: string,
    }): CancelablePromise<Volo_Abp_Users_UserData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/lookup/by-username/{userName}',
            path: {
                'userName': userName,
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getUsersLookupSearch({
        sorting,
        filter,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        sorting?: string,
        filter?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/lookup/search',
            query: {
                'Sorting': sorting,
                'Filter': filter,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
                'ExtraProperties': extraProperties,
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
     * @returns number Success
     * @throws ApiError
     */
    public static getUsersLookupCount({
        filter,
    }: {
        filter?: string,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/users/lookup/count',
            query: {
                'Filter': filter,
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
