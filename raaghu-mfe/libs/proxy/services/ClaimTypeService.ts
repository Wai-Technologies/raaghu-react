/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_Identity_ClaimTypeDto } from '../models/Volo_Abp_Identity_ClaimTypeDto';
import type { Volo_Abp_Identity_CreateClaimTypeDto } from '../models/Volo_Abp_Identity_CreateClaimTypeDto';
import type { Volo_Abp_Identity_UpdateClaimTypeDto } from '../models/Volo_Abp_Identity_UpdateClaimTypeDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClaimTypeService {

    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getClaimTypes({
        filter,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/claim-types',
            query: {
                'Filter': filter,
                'Sorting': sorting,
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
     * @returns Volo_Abp_Identity_ClaimTypeDto Success
     * @throws ApiError
     */
    public static postClaimTypes({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_CreateClaimTypeDto,
    }): CancelablePromise<Volo_Abp_Identity_ClaimTypeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/identity/claim-types',
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
     * @returns Volo_Abp_Identity_ClaimTypeDto Success
     * @throws ApiError
     */
    public static getClaimTypes1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_Identity_ClaimTypeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/claim-types/{id}',
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
     * @returns Volo_Abp_Identity_ClaimTypeDto Success
     * @throws ApiError
     */
    public static putClaimTypes({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_Identity_UpdateClaimTypeDto,
    }): CancelablePromise<Volo_Abp_Identity_ClaimTypeDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/claim-types/{id}',
            path: {
                'id': id,
            },
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
    public static deleteClaimTypes({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/identity/claim-types/{id}',
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

}
