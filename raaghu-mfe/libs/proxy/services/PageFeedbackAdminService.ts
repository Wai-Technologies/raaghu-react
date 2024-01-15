/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackDto } from '../models/Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackDto';
import type { Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackSettingDto } from '../models/Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackSettingDto';
import type { Volo_CmsKit_Admin_PageFeedbacks_UpdatePageFeedbackDto } from '../models/Volo_CmsKit_Admin_PageFeedbacks_UpdatePageFeedbackDto';
import type { Volo_CmsKit_Admin_PageFeedbacks_UpdatePageFeedbackSettingsInput } from '../models/Volo_CmsKit_Admin_PageFeedbacks_UpdatePageFeedbackSettingsInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PageFeedbackAdminService {

    /**
     * @returns Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackDto Success
     * @throws ApiError
     */
    public static getPageFeedback({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/page-feedback/{id}',
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
     * @returns Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackDto Success
     * @throws ApiError
     */
    public static putPageFeedback({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_CmsKit_Admin_PageFeedbacks_UpdatePageFeedbackDto,
    }): CancelablePromise<Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/page-feedback/{id}',
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
    public static deletePageFeedback({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-admin/page-feedback/{id}',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getPageFeedback1({
        entityType,
        entityId,
        isHandled,
        isUseful,
        url,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        entityType?: string,
        entityId?: string,
        isHandled?: boolean,
        isUseful?: boolean,
        url?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/page-feedback',
            query: {
                'EntityType': entityType,
                'EntityId': entityId,
                'IsHandled': isHandled,
                'IsUseful': isUseful,
                'Url': url,
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
     * @returns string Success
     * @throws ApiError
     */
    public static getPageFeedbackEntityTypes(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/page-feedback/entity-types',
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
     * @returns Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackSettingDto Success
     * @throws ApiError
     */
    public static getPageFeedbackSettings(): CancelablePromise<Array<Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackSettingDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/page-feedback/settings',
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
    public static putPageFeedbackSettings({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_PageFeedbacks_UpdatePageFeedbackSettingsInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/page-feedback/settings',
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
