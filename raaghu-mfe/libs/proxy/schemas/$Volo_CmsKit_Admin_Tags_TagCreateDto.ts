/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Tags_TagCreateDto = {
    properties: {
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isReadOnly: true,
            isNullable: true,
        },
        entityType: {
            type: 'string',
            isRequired: true,
            maxLength: 64,
            minLength: 1,
        },
        name: {
            type: 'string',
            isRequired: true,
            maxLength: 32,
            minLength: 1,
        },
    },
} as const;
