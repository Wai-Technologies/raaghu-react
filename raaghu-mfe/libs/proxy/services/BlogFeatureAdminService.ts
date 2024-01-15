/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Admin_Blogs_BlogFeatureInputDto } from '../models/Volo_CmsKit_Admin_Blogs_BlogFeatureInputDto';
import type { Volo_CmsKit_Blogs_BlogFeatureDto } from '../models/Volo_CmsKit_Blogs_BlogFeatureDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlogFeatureAdminService {

    /**
     * @returns Volo_CmsKit_Blogs_BlogFeatureDto Success
     * @throws ApiError
     */
    public static getBlogsFeatures({
        blogId,
    }: {
        blogId: string,
    }): CancelablePromise<Array<Volo_CmsKit_Blogs_BlogFeatureDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/blogs/{blogId}/features',
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
     * @returns any Success
     * @throws ApiError
     */
    public static putBlogsFeatures({
        blogId,
        requestBody,
    }: {
        blogId: string,
        requestBody?: Volo_CmsKit_Admin_Blogs_BlogFeatureInputDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/blogs/{blogId}/features',
            path: {
                'blogId': blogId,
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

}
