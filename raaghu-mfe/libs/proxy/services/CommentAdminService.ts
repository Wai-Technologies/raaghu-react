/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_CmsKit_Admin_Comments_CommentWithAuthorDto } from '../models/Volo_CmsKit_Admin_Comments_CommentWithAuthorDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommentAdminService {

    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getComments({
        entityType,
        text,
        repliedCommentId,
        author,
        creationStartDate,
        creationEndDate,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        entityType?: string,
        text?: string,
        repliedCommentId?: string,
        author?: string,
        creationStartDate?: string,
        creationEndDate?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/comments',
            query: {
                'EntityType': entityType,
                'Text': text,
                'RepliedCommentId': repliedCommentId,
                'Author': author,
                'CreationStartDate': creationStartDate,
                'CreationEndDate': creationEndDate,
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
     * @returns Volo_CmsKit_Admin_Comments_CommentWithAuthorDto Success
     * @throws ApiError
     */
    public static getComments1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Admin_Comments_CommentWithAuthorDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/comments/{id}',
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
    public static deleteComments({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-admin/comments/{id}',
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
