/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput } from '../models/Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput';
import type { Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto } from '../models/Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto';
import type { Volo_Abp_OpenIddict_Scopes_Dtos_UpdateScopeInput } from '../models/Volo_Abp_OpenIddict_Scopes_Dtos_UpdateScopeInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ScopesService {

    /**
     * @returns Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto Success
     * @throws ApiError
     */
    public static getScopes({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/openiddict/scopes/{id}',
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
     * @returns Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto Success
     * @throws ApiError
     */
    public static putScopes({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_OpenIddict_Scopes_Dtos_UpdateScopeInput,
    }): CancelablePromise<Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/openiddict/scopes/{id}',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getScopes1({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/openiddict/scopes',
            query: {
                'Filter': filter,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
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
     * @returns Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto Success
     * @throws ApiError
     */
    public static postScopes({
        requestBody,
    }: {
        requestBody?: Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput,
    }): CancelablePromise<Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/openiddict/scopes',
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
    public static deleteScopes({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/openiddict/scopes',
            query: {
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
     * @returns Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto Success
     * @throws ApiError
     */
    public static getScopesAll(): CancelablePromise<Array<Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/openiddict/scopes/all',
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
