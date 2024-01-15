/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Admin_GlobalResources_GlobalResourcesDto } from '../models/Volo_CmsKit_Admin_GlobalResources_GlobalResourcesDto';
import type { Volo_CmsKit_Admin_GlobalResources_GlobalResourcesUpdateDto } from '../models/Volo_CmsKit_Admin_GlobalResources_GlobalResourcesUpdateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GlobalResourceAdminService {

    /**
     * @returns Volo_CmsKit_Admin_GlobalResources_GlobalResourcesDto Success
     * @throws ApiError
     */
    public static getGlobalResources(): CancelablePromise<Volo_CmsKit_Admin_GlobalResources_GlobalResourcesDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/global-resources',
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
    public static postGlobalResources({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_GlobalResources_GlobalResourcesUpdateDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/global-resources',
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
