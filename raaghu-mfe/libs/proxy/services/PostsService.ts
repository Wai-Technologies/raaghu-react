/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Blogging_Posts_CreatePostDto } from '../models/Volo_Blogging_Posts_CreatePostDto';
import type { Volo_Blogging_Posts_PostWithDetailsDto } from '../models/Volo_Blogging_Posts_PostWithDetailsDto';
import type { Volo_Blogging_Posts_UpdatePostDto } from '../models/Volo_Blogging_Posts_UpdatePostDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostsService {

    /**
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getPostsAll({
        blogId,
        tagName,
    }: {
        blogId: string,
        tagName?: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/posts/{blogId}/all',
            path: {
                'blogId': blogId,
            },
            query: {
                'tagName': tagName,
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
    public static getPostsAllByTime({
        blogId,
    }: {
        blogId: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/posts/{blogId}/all/by-time',
            path: {
                'blogId': blogId,
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
     * @returns Volo_Blogging_Posts_PostWithDetailsDto Success
     * @throws ApiError
     */
    public static getPostsRead({
        url,
        blogId,
    }: {
        url: string,
        blogId?: string,
    }): CancelablePromise<Volo_Blogging_Posts_PostWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/posts/read',
            query: {
                'Url': url,
                'BlogId': blogId,
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
     * @returns Volo_Blogging_Posts_PostWithDetailsDto Success
     * @throws ApiError
     */
    public static getPosts({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Blogging_Posts_PostWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/posts/{id}',
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
     * @returns Volo_Blogging_Posts_PostWithDetailsDto Success
     * @throws ApiError
     */
    public static putPosts({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Blogging_Posts_UpdatePostDto,
    }): CancelablePromise<Volo_Blogging_Posts_PostWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/blogging/posts/{id}',
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
    public static deletePosts({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/blogging/posts/{id}',
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
     * @returns Volo_Blogging_Posts_PostWithDetailsDto Success
     * @throws ApiError
     */
    public static postPosts({
        requestBody,
    }: {
        requestBody?: Volo_Blogging_Posts_CreatePostDto,
    }): CancelablePromise<Volo_Blogging_Posts_PostWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/blogging/posts',
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
