/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_CmsKit_Admin_Polls_CreatePollDto } from '../models/Volo_CmsKit_Admin_Polls_CreatePollDto';
import type { Volo_CmsKit_Admin_Polls_GetResultDto } from '../models/Volo_CmsKit_Admin_Polls_GetResultDto';
import type { Volo_CmsKit_Admin_Polls_PollWithDetailsDto } from '../models/Volo_CmsKit_Admin_Polls_PollWithDetailsDto';
import type { Volo_CmsKit_Admin_Polls_UpdatePollDto } from '../models/Volo_CmsKit_Admin_Polls_UpdatePollDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PollAdminService {

    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getPoll({
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
            url: '/api/cms-kit-admin/poll',
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
     * @returns Volo_CmsKit_Admin_Polls_PollWithDetailsDto Success
     * @throws ApiError
     */
    public static postPoll({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_Polls_CreatePollDto,
    }): CancelablePromise<Volo_CmsKit_Admin_Polls_PollWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/poll',
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
     * @returns Volo_CmsKit_Admin_Polls_PollWithDetailsDto Success
     * @throws ApiError
     */
    public static getPoll1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Admin_Polls_PollWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/poll/{id}',
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
     * @returns Volo_CmsKit_Admin_Polls_PollWithDetailsDto Success
     * @throws ApiError
     */
    public static putPoll({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_CmsKit_Admin_Polls_UpdatePollDto,
    }): CancelablePromise<Volo_CmsKit_Admin_Polls_PollWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/poll/{id}',
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
    public static deletePoll({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-admin/poll/{id}',
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getPollWidgets(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/poll/widgets',
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
     * @returns Volo_CmsKit_Admin_Polls_GetResultDto Success
     * @throws ApiError
     */
    public static getPollResult({
        id,
    }: {
        id?: string,
    }): CancelablePromise<Volo_CmsKit_Admin_Polls_GetResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/poll/result',
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

}
