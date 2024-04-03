/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Blogs_BlogFeatureDto } from '../models/Volo_CmsKit_Blogs_BlogFeatureDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlogFeatureService {

    /**
     * @returns Volo_CmsKit_Blogs_BlogFeatureDto Success
     * @throws ApiError
     */
    public static getBlogsFeatures({
        blogId,
        featureName,
    }: {
        blogId: string,
        featureName: string,
    }): CancelablePromise<Volo_CmsKit_Blogs_BlogFeatureDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit/blogs/{blogId}/features/{featureName}',
            path: {
                'blogId': blogId,
                'featureName': featureName,
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
