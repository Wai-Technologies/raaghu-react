/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_LanguageManagement_Dto_LanguageTextDto } from '../models/Volo_Abp_LanguageManagement_Dto_LanguageTextDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LanguageTextsService {

    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getLanguageTexts({
        filter,
        resourceName,
        baseCultureName,
        targetCultureName,
        getOnlyEmptyValues,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        resourceName?: string,
        baseCultureName?: string,
        targetCultureName?: string,
        getOnlyEmptyValues?: boolean,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/language-management/language-texts',
            query: {
                'Filter': filter,
                'ResourceName': resourceName,
                'BaseCultureName': baseCultureName,
                'TargetCultureName': targetCultureName,
                'GetOnlyEmptyValues': getOnlyEmptyValues,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
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
     * @returns Volo_Abp_LanguageManagement_Dto_LanguageTextDto Success
     * @throws ApiError
     */
    public static getLanguageTexts1({
        resourceName,
        cultureName,
        name,
        baseCultureName,
    }: {
        resourceName: string,
        cultureName: string,
        name: string,
        baseCultureName?: string,
    }): CancelablePromise<Volo_Abp_LanguageManagement_Dto_LanguageTextDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/language-management/language-texts/{resourceName}/{cultureName}/{name}',
            path: {
                'resourceName': resourceName,
                'cultureName': cultureName,
                'name': name,
            },
            query: {
                'baseCultureName': baseCultureName,
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
    public static putLanguageTexts({
        resourceName,
        cultureName,
        name,
        value,
    }: {
        resourceName: string,
        cultureName: string,
        name: string,
        value?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/language-management/language-texts/{resourceName}/{cultureName}/{name}',
            path: {
                'resourceName': resourceName,
                'cultureName': cultureName,
                'name': name,
            },
            query: {
                'value': value,
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
    public static putLanguageTextsRestore({
        resourceName,
        cultureName,
        name,
    }: {
        resourceName: string,
        cultureName: string,
        name: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/language-management/language-texts/{resourceName}/{cultureName}/{name}/restore',
            path: {
                'resourceName': resourceName,
                'cultureName': cultureName,
                'name': name,
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
