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
    public static getPagesBySlug({
        slug,
    }: {
        slug?: string,
    }): CancelablePromise<Volo_CmsKit_Contents_PageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/pages/by-slug',
            query: {
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
    public static getPagesHome(): CancelablePromise<Volo_CmsKit_Contents_PageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/pages/home',
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
    public static getPagesExist({
        slug,
    }: {
        slug?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/pages/exist',
            query: {
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

}
