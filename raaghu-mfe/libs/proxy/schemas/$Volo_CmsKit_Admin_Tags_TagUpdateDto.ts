/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Tags_TagUpdateDto = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
            maxLength: 32,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
