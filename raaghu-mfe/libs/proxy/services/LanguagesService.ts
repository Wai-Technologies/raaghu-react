/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_LanguageManagement_Dto_CreateLanguageDto } from '../models/Volo_Abp_LanguageManagement_Dto_CreateLanguageDto';
import type { Volo_Abp_LanguageManagement_Dto_CultureInfoDto } from '../models/Volo_Abp_LanguageManagement_Dto_CultureInfoDto';
import type { Volo_Abp_LanguageManagement_Dto_LanguageDto } from '../models/Volo_Abp_LanguageManagement_Dto_LanguageDto';
import type { Volo_Abp_LanguageManagement_Dto_LanguageResourceDto } from '../models/Volo_Abp_LanguageManagement_Dto_LanguageResourceDto';
import type { Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto } from '../models/Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LanguagesService {

    /**
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getLanguagesAll(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/language-management/languages/all',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getLanguages({
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
            url: '/api/language-management/languages',
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
     * @returns Volo_Abp_LanguageManagement_Dto_LanguageDto Success
     * @throws ApiError
     */
    public static postLanguages({
        requestBody,
    }: {
        requestBody?: Volo_Abp_LanguageManagement_Dto_CreateLanguageDto,
    }): CancelablePromise<Volo_Abp_LanguageManagement_Dto_LanguageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/language-management/languages',
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

    /**
     * @returns Volo_Abp_LanguageManagement_Dto_LanguageDto Success
     * @throws ApiError
     */
    public static getLanguages1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_LanguageManagement_Dto_LanguageDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/language-management/languages/{id}',
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
     * @returns Volo_Abp_LanguageManagement_Dto_LanguageDto Success
     * @throws ApiError
     */
    public static putLanguages({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto,
    }): CancelablePromise<Volo_Abp_LanguageManagement_Dto_LanguageDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/language-management/languages/{id}',
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

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static deleteLanguages({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/language-management/languages/{id}',
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
    public static putLanguagesSetAsDefault({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/language-management/languages/{id}/set-as-default',
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
     * @returns Volo_Abp_LanguageManagement_Dto_LanguageResourceDto Success
     * @throws ApiError
     */
    public static getLanguagesResources(): CancelablePromise<Array<Volo_Abp_LanguageManagement_Dto_LanguageResourceDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/language-management/languages/resources',
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
     * @returns Volo_Abp_LanguageManagement_Dto_CultureInfoDto Success
     * @throws ApiError
     */
    public static getLanguagesCultureList(): CancelablePromise<Array<Volo_Abp_LanguageManagement_Dto_CultureInfoDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/language-management/languages/culture-list',
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
     * @returns string Success
     * @throws ApiError
     */
    public static getLanguagesFlagList(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/language-management/languages/flag-list',
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
