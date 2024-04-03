/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Contents_PageDto } from '../models/Volo_CmsKit_Contents_PageDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PagesPublicService {

    /**
     * @returns Volo_CmsKit_Contents_PageDto Success
     * @throws ApiError
     */
    public static getPages({
        slug,
    }: {
        slug: string,
    }): CancelablePromise<Volo_CmsKit_Contents_PageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/pages/{slug}',
            path: {
                'slug': slug,
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
     * @returns Volo_CmsKit_Contents_PageDto Success
     * @throws ApiError
     */
    public static getPages1(): CancelablePromise<Volo_CmsKit_Contents_PageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/pages',
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
