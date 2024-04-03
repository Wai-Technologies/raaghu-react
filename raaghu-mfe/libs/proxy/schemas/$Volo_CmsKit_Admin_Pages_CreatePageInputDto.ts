/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Pages_CreatePageInputDto = {
    properties: {
        title: {
            type: 'string',
            isRequired: true,
            maxLength: 256,
        },
        slug: {
            type: 'string',
            isRequired: true,
            maxLength: 256,
        },
        content: {
            type: 'string',
            isNullable: true,
            maxLength: 2147483647,
        },
        script: {
            type: 'string',
            isNullable: true,
            maxLength: 2147483647,
        },
        style: {
            type: 'string',
            isNullable: true,
            maxLength: 2147483647,
        },
    },
} as const;
