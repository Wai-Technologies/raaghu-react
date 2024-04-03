/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Public_UrlShorting_ShortenedUrlDto } from '../models/Volo_CmsKit_Public_UrlShorting_ShortenedUrlDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UrlShortingPublicService {

    /**
     * @returns Volo_CmsKit_Public_UrlShorting_ShortenedUrlDto Success
     * @throws ApiError
     */
    public static getUrlShorting({
        source,
    }: {
        source?: string,
    }): CancelablePromise<Volo_CmsKit_Public_UrlShorting_ShortenedUrlDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/url-shorting',
            query: {
                'source': source,
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
