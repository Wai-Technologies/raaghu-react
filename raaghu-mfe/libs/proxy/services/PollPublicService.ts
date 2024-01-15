/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Public_Polls_GetResultDto } from '../models/Volo_CmsKit_Public_Polls_GetResultDto';
import type { Volo_CmsKit_Public_Polls_PollWithDetailsDto } from '../models/Volo_CmsKit_Public_Polls_PollWithDetailsDto';
import type { Volo_CmsKit_Public_Polls_SubmitPollInput } from '../models/Volo_CmsKit_Public_Polls_SubmitPollInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PollPublicService {

    /**
     * @returns boolean Success
     * @throws ApiError
     */
    public static getPollWidgetNameAvailable({
        widgetName,
    }: {
        widgetName?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/poll/widget-name-available',
            query: {
                'widgetName': widgetName,
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
     * @returns Volo_CmsKit_Public_Polls_PollWithDetailsDto Success
     * @throws ApiError
     */
    public static getPollByAvailableWidgetName({
        widgetName,
    }: {
        widgetName?: string,
    }): CancelablePromise<Volo_CmsKit_Public_Polls_PollWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/poll/by-available-widget-name',
            query: {
                'widgetName': widgetName,
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
     * @returns Volo_CmsKit_Public_Polls_PollWithDetailsDto Success
     * @throws ApiError
     */
    public static getPollByCode({
        code,
    }: {
        code?: string,
    }): CancelablePromise<Volo_CmsKit_Public_Polls_PollWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/poll/by-code',
            query: {
                'code': code,
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
     * @returns Volo_CmsKit_Public_Polls_GetResultDto Success
     * @throws ApiError
     */
    public static getPollResult({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Public_Polls_GetResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/poll/result/{id}',
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
    public static postPoll({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_CmsKit_Public_Polls_SubmitPollInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-public/poll/{id}',
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

}
