/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_CmsKit_Admin_Blogs_BlogDto } from '../models/Volo_CmsKit_Admin_Blogs_BlogDto';
import type { Volo_CmsKit_Admin_Blogs_CreateBlogDto } from '../models/Volo_CmsKit_Admin_Blogs_CreateBlogDto';
import type { Volo_CmsKit_Admin_Blogs_UpdateBlogDto } from '../models/Volo_CmsKit_Admin_Blogs_UpdateBlogDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlogAdminService {

    /**
     * @returns Volo_CmsKit_Admin_Blogs_BlogDto Success
     * @throws ApiError
     */
    public static getBlogs({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Admin_Blogs_BlogDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/blogs/{id}',
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
     * @returns Volo_CmsKit_Admin_Blogs_BlogDto Success
     * @throws ApiError
     */
    public static putBlogs({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_CmsKit_Admin_Blogs_UpdateBlogDto,
    }): CancelablePromise<Volo_CmsKit_Admin_Blogs_BlogDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/blogs/{id}',
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
    public static deleteBlogs({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-admin/blogs/{id}',
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
    public static getBlogs1({
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
            url: '/api/cms-kit-admin/blogs',
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
     * @returns Volo_CmsKit_Admin_Blogs_BlogDto Success
     * @throws ApiError
     */
    public static postBlogs({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_Blogs_CreateBlogDto,
    }): CancelablePromise<Volo_CmsKit_Admin_Blogs_BlogDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/blogs',
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
