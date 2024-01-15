/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_TextTemplateManagement_TextTemplates_TemplateDefinitionDto } from '../models/Volo_Abp_TextTemplateManagement_TextTemplates_TemplateDefinitionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TextTemplateDefinitionsService {

    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getTemplateDefinitions({
        filterText,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filterText?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/text-template-management/template-definitions',
            query: {
                'FilterText': filterText,
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
     * @returns Volo_Abp_TextTemplateManagement_TextTemplates_TemplateDefinitionDto Success
     * @throws ApiError
     */
    public static getTemplateDefinitions1({
        name,
    }: {
        name: string,
    }): CancelablePromise<Volo_Abp_TextTemplateManagement_TextTemplates_TemplateDefinitionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/text-template-management/template-definitions/{name}',
            path: {
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
