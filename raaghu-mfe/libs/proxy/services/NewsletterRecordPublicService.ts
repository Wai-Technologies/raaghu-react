/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Public_Newsletters_CreateNewsletterRecordInput } from '../models/Volo_CmsKit_Public_Newsletters_CreateNewsletterRecordInput';
import type { Volo_CmsKit_Public_Newsletters_NewsletterEmailOptionsDto } from '../models/Volo_CmsKit_Public_Newsletters_NewsletterEmailOptionsDto';
import type { Volo_CmsKit_Public_Newsletters_NewsletterPreferenceDetailsDto } from '../models/Volo_CmsKit_Public_Newsletters_NewsletterPreferenceDetailsDto';
import type { Volo_CmsKit_Public_Newsletters_UpdatePreferenceRequestInput } from '../models/Volo_CmsKit_Public_Newsletters_UpdatePreferenceRequestInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewsletterRecordPublicService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postNewsletter({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Public_Newsletters_CreateNewsletterRecordInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-public/newsletter',
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
    public static putNewsletter({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Public_Newsletters_UpdatePreferenceRequestInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-public/newsletter',
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
     * @returns Volo_CmsKit_Public_Newsletters_NewsletterPreferenceDetailsDto Success
     * @throws ApiError
     */
    public static getNewsletterEmailAddress({
        emailAddress,
    }: {
        emailAddress?: string,
    }): CancelablePromise<Array<Volo_CmsKit_Public_Newsletters_NewsletterPreferenceDetailsDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/newsletter/emailAddress',
            query: {
                'emailAddress': emailAddress,
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
     * @returns Volo_CmsKit_Public_Newsletters_NewsletterEmailOptionsDto Success
     * @throws ApiError
     */
    public static getNewsletterPreferenceOptions({
        preference,
    }: {
        preference?: string,
    }): CancelablePromise<Volo_CmsKit_Public_Newsletters_NewsletterEmailOptionsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/newsletter/preference-options',
            query: {
                'preference': preference,
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
