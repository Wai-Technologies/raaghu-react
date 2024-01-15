/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_CmsKit_Admin_Tags_TagCreateDto } from '../models/Volo_CmsKit_Admin_Tags_TagCreateDto';
import type { Volo_CmsKit_Admin_Tags_TagDefinitionDto } from '../models/Volo_CmsKit_Admin_Tags_TagDefinitionDto';
import type { Volo_CmsKit_Admin_Tags_TagUpdateDto } from '../models/Volo_CmsKit_Admin_Tags_TagUpdateDto';
import type { Volo_CmsKit_Tags_TagDto } from '../models/Volo_CmsKit_Tags_TagDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TagAdminService {

    /**
     * @returns Volo_CmsKit_Tags_TagDto Success
     * @throws ApiError
     */
    public static postTags({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_Tags_TagCreateDto,
    }): CancelablePromise<Volo_CmsKit_Tags_TagDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/tags',
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
    public static getTags({
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
            url: '/api/cms-kit-admin/tags',
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteTags({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-admin/tags/{id}',
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
     * @returns Volo_CmsKit_Tags_TagDto Success
     * @throws ApiError
     */
    public static getTags1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Tags_TagDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/tags/{id}',
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
     * @returns Volo_CmsKit_Tags_TagDto Success
     * @throws ApiError
     */
    public static putTags({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_CmsKit_Admin_Tags_TagUpdateDto,
    }): CancelablePromise<Volo_CmsKit_Tags_TagDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/tags/{id}',
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
     * @returns Volo_CmsKit_Admin_Tags_TagDefinitionDto Success
     * @throws ApiError
     */
    public static getTagsTagDefinitions(): CancelablePromise<Array<Volo_CmsKit_Admin_Tags_TagDefinitionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/tags/tag-definitions',
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
