/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_CmsKit_Admin_Blogs_BlogPostDto } from '../models/Volo_CmsKit_Admin_Blogs_BlogPostDto';
import type { Volo_CmsKit_Admin_Blogs_CreateBlogPostDto } from '../models/Volo_CmsKit_Admin_Blogs_CreateBlogPostDto';
import type { Volo_CmsKit_Admin_Blogs_UpdateBlogPostDto } from '../models/Volo_CmsKit_Admin_Blogs_UpdateBlogPostDto';
import type { Volo_CmsKit_Blogs_BlogPostStatus } from '../models/Volo_CmsKit_Blogs_BlogPostStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlogPostAdminService {

    /**
     * @returns Volo_CmsKit_Admin_Blogs_BlogPostDto Success
     * @throws ApiError
     */
    public static postBlogsBlogPosts({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_Blogs_CreateBlogPostDto,
    }): CancelablePromise<Volo_CmsKit_Admin_Blogs_BlogPostDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/blogs/blog-posts',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getBlogsBlogPosts({
        filter,
        blogId,
        authorId,
        tagId,
        status,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        blogId?: string,
        authorId?: string,
        tagId?: string,
        status?: Volo_CmsKit_Blogs_BlogPostStatus,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/blogs/blog-posts',
            query: {
                'Filter': filter,
                'BlogId': blogId,
                'AuthorId': authorId,
                'TagId': tagId,
                'Status': status,
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteBlogsBlogPosts({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-admin/blogs/blog-posts/{id}',
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
     * @returns Volo_CmsKit_Admin_Blogs_BlogPostDto Success
     * @throws ApiError
     */
    public static getBlogsBlogPosts1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Admin_Blogs_BlogPostDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/blogs/blog-posts/{id}',
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
     * @returns Volo_CmsKit_Admin_Blogs_BlogPostDto Success
     * @throws ApiError
     */
    public static putBlogsBlogPosts({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_CmsKit_Admin_Blogs_UpdateBlogPostDto,
    }): CancelablePromise<Volo_CmsKit_Admin_Blogs_BlogPostDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/blogs/blog-posts/{id}',
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
    public static postBlogsBlogPostsPublish({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/blogs/blog-posts/{id}/publish',
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
    public static postBlogsBlogPostsDraft({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/blogs/blog-posts/{id}/draft',
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
     * @returns Volo_CmsKit_Admin_Blogs_BlogPostDto Success
     * @throws ApiError
     */
    public static postBlogsBlogPostsCreateAndPublish({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_Blogs_CreateBlogPostDto,
    }): CancelablePromise<Volo_CmsKit_Admin_Blogs_BlogPostDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/blogs/blog-posts/create-and-publish',
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
    public static postBlogsBlogPostsSendToReview({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/blogs/blog-posts/{id}/send-to-review',
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
     * @returns Volo_CmsKit_Admin_Blogs_BlogPostDto Success
     * @throws ApiError
     */
    public static postBlogsBlogPostsCreateAndSendToReview({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_Blogs_CreateBlogPostDto,
    }): CancelablePromise<Volo_CmsKit_Admin_Blogs_BlogPostDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/blogs/blog-posts/create-and-send-to-review',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static getBlogsBlogPostsHasBlogpostWaitingForReview(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/blogs/blog-posts/has-blogpost-waiting-for-review',
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
