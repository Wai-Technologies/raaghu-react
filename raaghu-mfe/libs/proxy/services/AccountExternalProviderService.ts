/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Account_ExternalProviders_ExternalProviderDto } from '../models/Volo_Abp_Account_ExternalProviders_ExternalProviderDto';
import type { Volo_Abp_Account_ExternalProviders_ExternalProviderItemWithSecretDto } from '../models/Volo_Abp_Account_ExternalProviders_ExternalProviderItemWithSecretDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountExternalProviderService {

    /**
     * @returns Volo_Abp_Account_ExternalProviders_ExternalProviderDto Success
     * @throws ApiError
     */
    public static getExternalProvider(): CancelablePromise<Volo_Abp_Account_ExternalProviders_ExternalProviderDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/external-provider',
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
     * @returns Volo_Abp_Account_ExternalProviders_ExternalProviderItemWithSecretDto Success
     * @throws ApiError
     */
    public static getExternalProviderByName({
        tenantId,
        name,
    }: {
        tenantId?: string,
        name?: string,
    }): CancelablePromise<Volo_Abp_Account_ExternalProviders_ExternalProviderItemWithSecretDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/external-provider/by-name',
            query: {
                'TenantId': tenantId,
                'Name': name,
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
