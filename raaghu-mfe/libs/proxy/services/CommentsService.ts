/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Blogging_Comments_Dtos_CommentWithDetailsDto } from '../models/Volo_Blogging_Comments_Dtos_CommentWithDetailsDto';
import type { Volo_Blogging_Comments_Dtos_CommentWithRepliesDto } from '../models/Volo_Blogging_Comments_Dtos_CommentWithRepliesDto';
import type { Volo_Blogging_Comments_Dtos_CreateCommentDto } from '../models/Volo_Blogging_Comments_Dtos_CreateCommentDto';
import type { Volo_Blogging_Comments_Dtos_UpdateCommentDto } from '../models/Volo_Blogging_Comments_Dtos_UpdateCommentDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CommentsService {

    /**
     * @returns Volo_Blogging_Comments_Dtos_CommentWithRepliesDto Success
     * @throws ApiError
     */
    public static getCommentsHierarchical({
        postId,
    }: {
        postId: string,
    }): CancelablePromise<Array<Volo_Blogging_Comments_Dtos_CommentWithRepliesDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/comments/hierarchical/{postId}',
            path: {
                'postId': postId,
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
     * @returns Volo_Blogging_Comments_Dtos_CommentWithDetailsDto Success
     * @throws ApiError
     */
    public static postComments({
        requestBody,
    }: {
        requestBody?: Volo_Blogging_Comments_Dtos_CreateCommentDto,
    }): CancelablePromise<Volo_Blogging_Comments_Dtos_CommentWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/blogging/comments',
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
     * @returns Volo_Blogging_Comments_Dtos_CommentWithDetailsDto Success
     * @throws ApiError
     */
    public static putComments({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Blogging_Comments_Dtos_UpdateCommentDto,
    }): CancelablePromise<Volo_Blogging_Comments_Dtos_CommentWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/blogging/comments/{id}',
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
            url: '/api/blogging/comments/{id}',
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
