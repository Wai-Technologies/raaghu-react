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
     * @returns Volo_CmsKit_Public_Polls_PollWithDetailsDto Success
     * @throws ApiError
     */
    public static getPollFindbywidget({
        widgetName,
    }: {
        widgetName?: string,
    }): CancelablePromise<Volo_CmsKit_Public_Polls_PollWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/poll/findbywidget',
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
    public static getPollFindbycode({
        code,
    }: {
        code?: string,
    }): CancelablePromise<Volo_CmsKit_Public_Polls_PollWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/poll/findbycode',
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
    public static getPollShowresult({
        id,
    }: {
        id?: string,
    }): CancelablePromise<Volo_CmsKit_Public_Polls_GetResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/poll/showresult',
            query: {
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
