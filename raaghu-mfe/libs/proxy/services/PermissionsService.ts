/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_PermissionManagement_GetPermissionListResultDto } from '../models/Volo_Abp_PermissionManagement_GetPermissionListResultDto';
import type { Volo_Abp_PermissionManagement_UpdatePermissionsDto } from '../models/Volo_Abp_PermissionManagement_UpdatePermissionsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PermissionsService {

    /**
     * @returns Volo_Abp_PermissionManagement_GetPermissionListResultDto Success
     * @throws ApiError
     */
    public static getPermissions({
        providerName,
        providerKey,
    }: {
        providerName?: string,
        providerKey?: string,
    }): CancelablePromise<Volo_Abp_PermissionManagement_GetPermissionListResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/permission-management/permissions',
            query: {
                'providerName': providerName,
                'providerKey': providerKey,
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
     * @returns any Success
     * @throws ApiError
     */
    public static putPermissions({
        providerName,
        providerKey,
        requestBody,
    }: {
        providerName?: string,
        providerKey?: string,
        requestBody?: Volo_Abp_PermissionManagement_UpdatePermissionsDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/permission-management/permissions',
            query: {
                'providerName': providerName,
                'providerKey': providerKey,
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

}
