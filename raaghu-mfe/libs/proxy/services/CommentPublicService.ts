/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_CmsKit_Public_Comments_CommentDto } from '../models/Volo_CmsKit_Public_Comments_CommentDto';
import type { Volo_CmsKit_Public_Comments_CreateCommentInput } from '../models/Volo_CmsKit_Public_Comments_CreateCommentInput';
import type { Volo_CmsKit_Public_Comments_UpdateCommentInput } from '../models/Volo_CmsKit_Public_Comments_UpdateCommentInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommentPublicService {

    /**
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getComments({
        entityType,
        entityId,
    }: {
        entityType: string,
        entityId: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/comments/{entityType}/{entityId}',
            path: {
                'entityType': entityType,
                'entityId': entityId,
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
     * @returns Volo_CmsKit_Public_Comments_CommentDto Success
     * @throws ApiError
     */
    public static postComments({
        entityType,
        entityId,
        requestBody,
    }: {
        entityType: string,
        entityId: string,
        requestBody?: Volo_CmsKit_Public_Comments_CreateCommentInput,
    }): CancelablePromise<Volo_CmsKit_Public_Comments_CommentDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-public/comments/{entityType}/{entityId}',
            path: {
                'entityType': entityType,
                'entityId': entityId,
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
     * @returns Volo_CmsKit_Public_Comments_CommentDto Success
     * @throws ApiError
     */
    public static putComments({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_CmsKit_Public_Comments_UpdateCommentInput,
    }): CancelablePromise<Volo_CmsKit_Public_Comments_CommentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-public/comments/{id}',
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
    public static deleteComments({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-public/comments/{id}',
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
