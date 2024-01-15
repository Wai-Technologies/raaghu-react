/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Public_PageFeedbacks_CreatePageFeedbackInput } from '../models/Volo_CmsKit_Public_PageFeedbacks_CreatePageFeedbackInput';
import type { Volo_CmsKit_Public_PageFeedbacks_PageFeedbackDto } from '../models/Volo_CmsKit_Public_PageFeedbacks_PageFeedbackDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PageFeedbackPublicService {

    /**
     * @returns Volo_CmsKit_Public_PageFeedbacks_PageFeedbackDto Success
     * @throws ApiError
     */
    public static postPageFeedback({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Public_PageFeedbacks_CreatePageFeedbackInput,
    }): CancelablePromise<Volo_CmsKit_Public_PageFeedbacks_PageFeedbackDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-public/page-feedback',
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
