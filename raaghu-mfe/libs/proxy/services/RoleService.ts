/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_Identity_ClaimTypeDto } from '../models/Volo_Abp_Identity_ClaimTypeDto';
import type { Volo_Abp_Identity_IdentityRoleClaimDto } from '../models/Volo_Abp_Identity_IdentityRoleClaimDto';
import type { Volo_Abp_Identity_IdentityRoleCreateDto } from '../models/Volo_Abp_Identity_IdentityRoleCreateDto';
import type { Volo_Abp_Identity_IdentityRoleDto } from '../models/Volo_Abp_Identity_IdentityRoleDto';
import type { Volo_Abp_Identity_IdentityRoleUpdateDto } from '../models/Volo_Abp_Identity_IdentityRoleUpdateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoleService {

    /**
     * @returns Volo_Abp_Identity_IdentityRoleDto Success
     * @throws ApiError
     */
    public static getRoles({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_Identity_IdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/roles/{id}',
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
     * @returns Volo_Abp_Identity_IdentityRoleDto Success
     * @throws ApiError
     */
    public static putRoles({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_Identity_IdentityRoleUpdateDto,
    }): CancelablePromise<Volo_Abp_Identity_IdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/roles/{id}',
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
    public static deleteRoles({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/identity/roles/{id}',
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
     * @returns Volo_Abp_Identity_IdentityRoleDto Success
     * @throws ApiError
     */
    public static postRoles({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_IdentityRoleCreateDto,
    }): CancelablePromise<Volo_Abp_Identity_IdentityRoleDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/identity/roles',
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
    public static getRoles1({
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
            url: '/api/identity/roles',
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getRolesAll(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/roles/all',
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
    public static putRolesClaims({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Array<Volo_Abp_Identity_IdentityRoleClaimDto>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/roles/{id}/claims',
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
     * @returns Volo_Abp_Identity_IdentityRoleClaimDto Success
     * @throws ApiError
     */
    public static getRolesClaims({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<Volo_Abp_Identity_IdentityRoleClaimDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/roles/{id}/claims',
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
     * @returns any Success
     * @throws ApiError
     */
    public static putRolesMoveAllUsers({
        id,
        roleId,
    }: {
        id: string,
        roleId?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/roles/{id}/move-all-users',
            path: {
                'id': id,
            },
            query: {
                'roleId': roleId,
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
    public static getRolesAllClaimTypes(): CancelablePromise<Array<Volo_Abp_Identity_ClaimTypeDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/roles/all-claim-types',
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
