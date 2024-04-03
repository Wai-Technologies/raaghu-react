/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_CmsKit_Admin_UrlShorting_CreateShortenedUrlDto } from '../models/Volo_CmsKit_Admin_UrlShorting_CreateShortenedUrlDto';
import type { Volo_CmsKit_Admin_UrlShorting_ShortenedUrlDto } from '../models/Volo_CmsKit_Admin_UrlShorting_ShortenedUrlDto';
import type { Volo_CmsKit_Admin_UrlShorting_UpdateShortenedUrlDto } from '../models/Volo_CmsKit_Admin_UrlShorting_UpdateShortenedUrlDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UrlShortingAdminService {

    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getUrlShorting({
        shortenedUrlFilter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        shortenedUrlFilter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/url-shorting',
            query: {
                'ShortenedUrlFilter': shortenedUrlFilter,
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
     * @returns Volo_CmsKit_Admin_UrlShorting_ShortenedUrlDto Success
     * @throws ApiError
     */
    public static postUrlShorting({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_UrlShorting_CreateShortenedUrlDto,
    }): CancelablePromise<Volo_CmsKit_Admin_UrlShorting_ShortenedUrlDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/url-shorting',
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
     * @returns Volo_CmsKit_Admin_UrlShorting_ShortenedUrlDto Success
     * @throws ApiError
     */
    public static getUrlShorting1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Admin_UrlShorting_ShortenedUrlDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/url-shorting/{id}',
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
     * @returns Volo_CmsKit_Admin_UrlShorting_ShortenedUrlDto Success
     * @throws ApiError
     */
    public static putUrlShorting({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_CmsKit_Admin_UrlShorting_UpdateShortenedUrlDto,
    }): CancelablePromise<Volo_CmsKit_Admin_UrlShorting_ShortenedUrlDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/url-shorting/{id}',
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
    public static deleteUrlShorting({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-admin/url-shorting/{id}',
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
