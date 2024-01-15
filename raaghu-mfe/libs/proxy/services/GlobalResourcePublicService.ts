/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Public_GlobalResources_GlobalResourceDto } from '../models/Volo_CmsKit_Public_GlobalResources_GlobalResourceDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GlobalResourcePublicService {

    /**
     * @returns Volo_CmsKit_Public_GlobalResources_GlobalResourceDto Success
     * @throws ApiError
     */
    public static getGlobalResourcesScript(): CancelablePromise<Volo_CmsKit_Public_GlobalResources_GlobalResourceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/global-resources/script',
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
     * @returns Volo_CmsKit_Public_GlobalResources_GlobalResourceDto Success
     * @throws ApiError
     */
    public static getGlobalResourcesStyle(): CancelablePromise<Volo_CmsKit_Public_GlobalResources_GlobalResourceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/global-resources/style',
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
