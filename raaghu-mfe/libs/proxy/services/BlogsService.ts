/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Blogging_Blogs_Dtos_BlogDto } from '../models/Volo_Blogging_Blogs_Dtos_BlogDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlogsService {

    /**
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getBlogs(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/blogs',
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
    public static getBlogsByShortname({
        shortName,
    }: {
        shortName: string,
    }): CancelablePromise<Volo_Blogging_Blogs_Dtos_BlogDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/blogs/by-shortname/{shortName}',
            path: {
                'shortName': shortName,
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
    public static getBlogs1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Blogging_Blogs_Dtos_BlogDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/blogs/{id}',
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
