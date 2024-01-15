/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto } from '../models/Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AbpApplicationLocalizationService {

    /**
     * @returns Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto Success
     * @throws ApiError
     */
    public static getApplicationLocalization({
        cultureName,
        onlyDynamics,
    }: {
        cultureName: string,
        onlyDynamics?: boolean,
    }): CancelablePromise<Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/abp/application-localization',
            query: {
                'CultureName': cultureName,
                'OnlyDynamics': onlyDynamics,
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
