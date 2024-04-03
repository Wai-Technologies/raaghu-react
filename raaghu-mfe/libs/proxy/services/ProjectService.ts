/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Docs_Documents_LanguageConfig } from '../models/Volo_Docs_Documents_LanguageConfig';
import type { Volo_Docs_Projects_ProjectDto } from '../models/Volo_Docs_Projects_ProjectDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProjectService {

    /**
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getProjects(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/projects',
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
     * @returns Volo_Docs_Projects_ProjectDto Success
     * @throws ApiError
     */
    public static getProjects1({
        shortName,
    }: {
        shortName: string,
    }): CancelablePromise<Volo_Docs_Projects_ProjectDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/projects/{shortName}',
            path: {
                'shortName': shortName,
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
     * @returns string Success
     * @throws ApiError
     */
    public static getProjectsDefaultLanguage({
        shortName,
        version,
    }: {
        shortName: string,
        version?: string,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/projects/{shortName}/defaultLanguage',
            path: {
                'shortName': shortName,
            },
            query: {
                'version': version,
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getProjectsVersions({
        shortName,
    }: {
        shortName: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/projects/{shortName}/versions',
            path: {
                'shortName': shortName,
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
     * @returns Volo_Docs_Documents_LanguageConfig Success
     * @throws ApiError
     */
    public static getProjectsLanguageList({
        shortName,
        version,
    }: {
        shortName: string,
        version: string,
    }): CancelablePromise<Volo_Docs_Documents_LanguageConfig> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/projects/{shortName}/{version}/languageList',
            path: {
                'shortName': shortName,
                'version': version,
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
