/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Tags_TagDto } from '../models/Volo_CmsKit_Tags_TagDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TagPublicService {

    /**
     * @returns Volo_CmsKit_Tags_TagDto Success
     * @throws ApiError
     */
    public static getTags({
        entityType,
        entityId,
    }: {
        entityType: string,
        entityId: string,
    }): CancelablePromise<Array<Volo_CmsKit_Tags_TagDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/tags/{entityType}/{entityId}',
            path: {
                'entityType': entityType,
                'entityId': entityId,
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
