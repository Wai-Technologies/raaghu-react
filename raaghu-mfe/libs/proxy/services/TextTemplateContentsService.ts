/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_TextTemplateManagement_TextTemplates_RestoreTemplateContentInput } from '../models/Volo_Abp_TextTemplateManagement_TextTemplates_RestoreTemplateContentInput';
import type { Volo_Abp_TextTemplateManagement_TextTemplates_TextTemplateContentDto } from '../models/Volo_Abp_TextTemplateManagement_TextTemplates_TextTemplateContentDto';
import type { Volo_Abp_TextTemplateManagement_TextTemplates_UpdateTemplateContentInput } from '../models/Volo_Abp_TextTemplateManagement_TextTemplates_UpdateTemplateContentInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TextTemplateContentsService {

    /**
     * @returns Volo_Abp_TextTemplateManagement_TextTemplates_TextTemplateContentDto Success
     * @throws ApiError
     */
    public static getTemplateContents({
        templateName,
        cultureName,
    }: {
        templateName: string,
        cultureName?: string,
    }): CancelablePromise<Volo_Abp_TextTemplateManagement_TextTemplates_TextTemplateContentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/text-template-management/template-contents',
            query: {
                'TemplateName': templateName,
                'CultureName': cultureName,
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
     * @returns Volo_Abp_TextTemplateManagement_TextTemplates_TextTemplateContentDto Success
     * @throws ApiError
     */
    public static putTemplateContents({
        requestBody,
    }: {
        requestBody?: Volo_Abp_TextTemplateManagement_TextTemplates_UpdateTemplateContentInput,
    }): CancelablePromise<Volo_Abp_TextTemplateManagement_TextTemplates_TextTemplateContentDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/text-template-management/template-contents',
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
    public static putTemplateContentsRestoreToDefault({
        requestBody,
    }: {
        requestBody?: Volo_Abp_TextTemplateManagement_TextTemplates_RestoreTemplateContentInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/text-template-management/template-contents/restore-to-default',
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
