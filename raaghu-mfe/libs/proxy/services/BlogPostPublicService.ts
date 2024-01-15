/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_CmsKit_Contents_BlogPostCommonDto } from '../models/Volo_CmsKit_Contents_BlogPostCommonDto';
import type { Volo_CmsKit_Users_CmsUserDto } from '../models/Volo_CmsKit_Users_CmsUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlogPostPublicService {

    /**
     * @returns Volo_CmsKit_Contents_BlogPostCommonDto Success
     * @throws ApiError
     */
    public static getBlogPosts({
        blogSlug,
        blogPostSlug,
    }: {
        blogSlug: string,
        blogPostSlug: string,
    }): CancelablePromise<Volo_CmsKit_Contents_BlogPostCommonDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/blog-posts/{blogSlug}/{blogPostSlug}',
            path: {
                'blogSlug': blogSlug,
                'blogPostSlug': blogPostSlug,
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
    public static getBlogPosts1({
        blogSlug,
        authorId,
        tagId,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        blogSlug: string,
        authorId?: string,
        tagId?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/blog-posts/{blogSlug}',
            path: {
                'blogSlug': blogSlug,
            },
            query: {
                'AuthorId': authorId,
                'TagId': tagId,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getBlogPostsAuthors({
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
            url: '/api/cms-kit-public/blog-posts/authors',
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
     * @returns Volo_CmsKit_Users_CmsUserDto Success
     * @throws ApiError
     */
    public static getBlogPostsAuthors1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Users_CmsUserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/blog-posts/authors/{id}',
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
    public static deleteBlogPosts({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-public/blog-posts/{id}',
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
     * @returns string Success
     * @throws ApiError
     */
    public static getBlogPostsTags({
        id,
        tagId,
    }: {
        id: string,
        tagId?: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/blog-posts/tags/{id}',
            path: {
                'id': id,
            },
            query: {
                'tagId': tagId,
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
