/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto } from '../models/Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AbpApplicationConfigurationService {

    /**
     * @returns Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto Success
     * @throws ApiError
     */
    public static getApplicationConfiguration({
        includeLocalizationResources,
    }: {
        includeLocalizationResources?: boolean,
    }): CancelablePromise<Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/abp/application-configuration',
            query: {
                'IncludeLocalizationResources': includeLocalizationResources,
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
