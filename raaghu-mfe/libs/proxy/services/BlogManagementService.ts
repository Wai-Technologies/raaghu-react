/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Blogging_Admin_Blogs_CreateBlogDto } from '../models/Volo_Blogging_Admin_Blogs_CreateBlogDto';
import type { Volo_Blogging_Admin_Blogs_UpdateBlogDto } from '../models/Volo_Blogging_Admin_Blogs_UpdateBlogDto';
import type { Volo_Blogging_Blogs_Dtos_BlogDto } from '../models/Volo_Blogging_Blogs_Dtos_BlogDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlogManagementService {

    /**
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getBlogsAdmin(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/blogs/admin',
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
     * @returns Volo_Blogging_Blogs_Dtos_BlogDto Success
     * @throws ApiError
     */
    public static postBlogsAdmin({
        requestBody,
    }: {
        requestBody?: Volo_Blogging_Admin_Blogs_CreateBlogDto,
    }): CancelablePromise<Volo_Blogging_Blogs_Dtos_BlogDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/blogging/blogs/admin',
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
     * @returns Volo_Blogging_Blogs_Dtos_BlogDto Success
     * @throws ApiError
     */
    public static getBlogsAdmin1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Blogging_Blogs_Dtos_BlogDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/blogs/admin/{id}',
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
     * @returns Volo_Blogging_Blogs_Dtos_BlogDto Success
     * @throws ApiError
     */
    public static putBlogsAdmin({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Blogging_Admin_Blogs_UpdateBlogDto,
    }): CancelablePromise<Volo_Blogging_Blogs_Dtos_BlogDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/blogging/blogs/admin/{id}',
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
    public static deleteBlogsAdmin({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/blogging/blogs/admin/{id}',
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
    public static getBlogsAdminClearCache({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/blogs/admin/clear-cache/{id}',
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
