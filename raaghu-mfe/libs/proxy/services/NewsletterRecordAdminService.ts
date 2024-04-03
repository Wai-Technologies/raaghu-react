/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_CmsKit_Admin_Newsletters_NewsletterRecordCsvDto } from '../models/Volo_CmsKit_Admin_Newsletters_NewsletterRecordCsvDto';
import type { Volo_CmsKit_Admin_Newsletters_NewsletterRecordWithDetailsDto } from '../models/Volo_CmsKit_Admin_Newsletters_NewsletterRecordWithDetailsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewsletterRecordAdminService {

    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getNewsletter({
        preference,
        source,
        skipCount,
        maxResultCount,
    }: {
        preference?: string,
        source?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/newsletter',
            query: {
                'Preference': preference,
                'Source': source,
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
     * @returns Volo_CmsKit_Admin_Newsletters_NewsletterRecordWithDetailsDto Success
     * @throws ApiError
     */
    public static getNewsletter1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Admin_Newsletters_NewsletterRecordWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/newsletter/{id}',
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
     * @returns Volo_CmsKit_Admin_Newsletters_NewsletterRecordCsvDto Success
     * @throws ApiError
     */
    public static getNewsletterCsvDetail({
        preference,
        source,
    }: {
        preference?: string,
        source?: string,
    }): CancelablePromise<Array<Volo_CmsKit_Admin_Newsletters_NewsletterRecordCsvDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/newsletter/csv-detail',
            query: {
                'Preference': preference,
                'Source': source,
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
    public static getNewsletterPreferences(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/newsletter/preferences',
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
     * @returns binary Success
     * @throws ApiError
     */
    public static getNewsletterExportCsv({
        preference,
        source,
    }: {
        preference?: string,
        source?: string,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/newsletter/export-csv',
            query: {
                'Preference': preference,
                'Source': source,
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
