/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Admin_Tags_EntityTagCreateDto } from '../models/Volo_CmsKit_Admin_Tags_EntityTagCreateDto';
import type { Volo_CmsKit_Admin_Tags_EntityTagSetDto } from '../models/Volo_CmsKit_Admin_Tags_EntityTagSetDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EntityTagAdminService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postEntityTags({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_Tags_EntityTagCreateDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/entity-tags',
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
    public static deleteEntityTags({
        tagId,
        entityType,
        entityId,
    }: {
        tagId: string,
        entityType: string,
        entityId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-admin/entity-tags',
            query: {
                'TagId': tagId,
                'EntityType': entityType,
                'EntityId': entityId,
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
    public static putEntityTags({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_Tags_EntityTagSetDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/entity-tags',
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
