/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Docs_Documents_DocumentParametersDto } from '../models/Volo_Docs_Documents_DocumentParametersDto';
import type { Volo_Docs_Documents_DocumentResourceDto } from '../models/Volo_Docs_Documents_DocumentResourceDto';
import type { Volo_Docs_Documents_DocumentSearchInput } from '../models/Volo_Docs_Documents_DocumentSearchInput';
import type { Volo_Docs_Documents_DocumentSearchOutput } from '../models/Volo_Docs_Documents_DocumentSearchOutput';
import type { Volo_Docs_Documents_DocumentWithDetailsDto } from '../models/Volo_Docs_Documents_DocumentWithDetailsDto';
import type { Volo_Docs_Documents_NavigationNode } from '../models/Volo_Docs_Documents_NavigationNode';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DocumentService {

    /**
     * @returns Volo_Docs_Documents_DocumentWithDetailsDto Success
     * @throws ApiError
     */
    public static getDocuments({
        name,
        languageCode,
        projectId,
        version,
    }: {
        name: string,
        languageCode: string,
        projectId?: string,
        version?: string,
    }): CancelablePromise<Volo_Docs_Documents_DocumentWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/documents',
            query: {
                'ProjectId': projectId,
                'Name': name,
                'Version': version,
                'LanguageCode': languageCode,
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
     * @returns Volo_Docs_Documents_DocumentWithDetailsDto Success
     * @throws ApiError
     */
    public static getDocumentsDefault({
        languageCode,
        projectId,
        version,
    }: {
        languageCode: string,
        projectId?: string,
        version?: string,
    }): CancelablePromise<Volo_Docs_Documents_DocumentWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/documents/default',
            query: {
                'ProjectId': projectId,
                'Version': version,
                'LanguageCode': languageCode,
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
     * @returns Volo_Docs_Documents_NavigationNode Success
     * @throws ApiError
     */
    public static getDocumentsNavigation({
        languageCode,
        projectId,
        version,
    }: {
        languageCode: string,
        projectId?: string,
        version?: string,
    }): CancelablePromise<Volo_Docs_Documents_NavigationNode> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/documents/navigation',
            query: {
                'ProjectId': projectId,
                'Version': version,
                'LanguageCode': languageCode,
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
     * @returns Volo_Docs_Documents_DocumentResourceDto Success
     * @throws ApiError
     */
    public static getDocumentsResource({
        name,
        languageCode,
        projectId,
        version,
    }: {
        name: string,
        languageCode: string,
        projectId?: string,
        version?: string,
    }): CancelablePromise<Volo_Docs_Documents_DocumentResourceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/documents/resource',
            query: {
                'ProjectId': projectId,
                'Name': name,
                'Version': version,
                'LanguageCode': languageCode,
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
     * @returns Volo_Docs_Documents_DocumentSearchOutput Success
     * @throws ApiError
     */
    public static postDocumentsSearch({
        requestBody,
    }: {
        requestBody?: Volo_Docs_Documents_DocumentSearchInput,
    }): CancelablePromise<Array<Volo_Docs_Documents_DocumentSearchOutput>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/docs/documents/search',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static getDocumentsFullSearchEnabled(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/documents/full-search-enabled',
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
    public static getDocumentsLinks({
        prefix,
    }: {
        prefix?: string,
    }): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/documents/links',
            query: {
                'prefix': prefix,
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
     * @returns Volo_Docs_Documents_DocumentParametersDto Success
     * @throws ApiError
     */
    public static getDocumentsParameters({
        languageCode,
        projectId,
        version,
    }: {
        languageCode: string,
        projectId?: string,
        version?: string,
    }): CancelablePromise<Volo_Docs_Documents_DocumentParametersDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/docs/documents/parameters',
            query: {
                'ProjectId': projectId,
                'Version': version,
                'LanguageCode': languageCode,
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
