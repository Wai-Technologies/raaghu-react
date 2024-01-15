/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_TextTemplateManagement_TextTemplates_UpdateTemplateContentInput = {
    properties: {
        templateName: {
            type: 'string',
            isRequired: true,
            maxLength: 128,
        },
        cultureName: {
            type: 'string',
            isNullable: true,
            maxLength: 10,
        },
        content: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
