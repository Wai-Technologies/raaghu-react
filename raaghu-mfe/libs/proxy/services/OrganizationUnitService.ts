/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_Identity_OrganizationUnitCreateDto } from '../models/Volo_Abp_Identity_OrganizationUnitCreateDto';
import type { Volo_Abp_Identity_OrganizationUnitMoveInput } from '../models/Volo_Abp_Identity_OrganizationUnitMoveInput';
import type { Volo_Abp_Identity_OrganizationUnitRoleInput } from '../models/Volo_Abp_Identity_OrganizationUnitRoleInput';
import type { Volo_Abp_Identity_OrganizationUnitUpdateDto } from '../models/Volo_Abp_Identity_OrganizationUnitUpdateDto';
import type { Volo_Abp_Identity_OrganizationUnitUserInput } from '../models/Volo_Abp_Identity_OrganizationUnitUserInput';
import type { Volo_Abp_Identity_OrganizationUnitWithDetailsDto } from '../models/Volo_Abp_Identity_OrganizationUnitWithDetailsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrganizationUnitService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static putOrganizationUnitsRoles({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_Identity_OrganizationUnitRoleInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/organization-units/{id}/roles',
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
    public static getOrganizationUnitsRoles({
        id,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        id: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/organization-units/{id}/roles',
            path: {
                'id': id,
            },
            query: {
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
     * @returns any Success
     * @throws ApiError
     */
    public static putOrganizationUnitsMembers({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_Identity_OrganizationUnitUserInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/organization-units/{id}/members',
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
    public static getOrganizationUnitsMembers({
        id,
        filter,
        roleId,
        organizationUnitId,
        userName,
        phoneNumber,
        emailAddress,
        name,
        surname,
        isLockedOut,
        notActive,
        emailConfirmed,
        isExternal,
        maxCreationTime,
        minCreationTime,
        maxModifitionTime,
        minModifitionTime,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        id: string,
        filter?: string,
        roleId?: string,
        organizationUnitId?: string,
        userName?: string,
        phoneNumber?: string,
        emailAddress?: string,
        name?: string,
        surname?: string,
        isLockedOut?: boolean,
        notActive?: boolean,
        emailConfirmed?: boolean,
        isExternal?: boolean,
        maxCreationTime?: string,
        minCreationTime?: string,
        maxModifitionTime?: string,
        minModifitionTime?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/organization-units/{id}/members',
            path: {
                'id': id,
            },
            query: {
                'Filter': filter,
                'RoleId': roleId,
                'OrganizationUnitId': organizationUnitId,
                'UserName': userName,
                'PhoneNumber': phoneNumber,
                'EmailAddress': emailAddress,
                'Name': name,
                'Surname': surname,
                'IsLockedOut': isLockedOut,
                'NotActive': notActive,
                'EmailConfirmed': emailConfirmed,
                'IsExternal': isExternal,
                'MaxCreationTime': maxCreationTime,
                'MinCreationTime': minCreationTime,
                'MaxModifitionTime': maxModifitionTime,
                'MinModifitionTime': minModifitionTime,
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
     * @returns Volo_Abp_Identity_OrganizationUnitWithDetailsDto Success
     * @throws ApiError
     */
    public static postOrganizationUnits({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Identity_OrganizationUnitCreateDto,
    }): CancelablePromise<Volo_Abp_Identity_OrganizationUnitWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/identity/organization-units',
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
    public static deleteOrganizationUnits({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/identity/organization-units',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getOrganizationUnits({
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
            url: '/api/identity/organization-units',
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
     * @returns Volo_Abp_Identity_OrganizationUnitWithDetailsDto Success
     * @throws ApiError
     */
    public static getOrganizationUnits1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_Identity_OrganizationUnitWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/organization-units/{id}',
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
     * @returns Volo_Abp_Identity_OrganizationUnitWithDetailsDto Success
     * @throws ApiError
     */
    public static putOrganizationUnits({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_Identity_OrganizationUnitUpdateDto,
    }): CancelablePromise<Volo_Abp_Identity_OrganizationUnitWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/organization-units/{id}',
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getOrganizationUnitsAll(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/organization-units/all',
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
    public static putOrganizationUnitsMove({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_Identity_OrganizationUnitMoveInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/organization-units/{id}/move',
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
    public static getOrganizationUnitsAvailableUsers({
        filter,
        id,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        filter?: string,
        id?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/organization-units/available-users',
            query: {
                'Filter': filter,
                'Id': id,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getOrganizationUnitsAvailableRoles({
        filter,
        id,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        filter?: string,
        id?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/identity/organization-units/available-roles',
            query: {
                'Filter': filter,
                'Id': id,
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
     * @returns any Success
     * @throws ApiError
     */
    public static putOrganizationUnitsMoveAllUsers({
        id,
        organizationId,
    }: {
        id: string,
        organizationId?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/identity/organization-units/{id}/move-all-users',
            path: {
                'id': id,
            },
            query: {
                'organizationId': organizationId,
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
    public static deleteOrganizationUnitsMembers({
        id,
        memberId,
    }: {
        id: string,
        memberId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/identity/organization-units/{id}/members/{memberId}',
            path: {
                'id': id,
                'memberId': memberId,
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
    public static deleteOrganizationUnitsRoles({
        id,
        roleId,
    }: {
        id: string,
        roleId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/identity/organization-units/{id}/roles/{roleId}',
            path: {
                'id': id,
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

}
