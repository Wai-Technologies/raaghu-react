/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Tags_TagCreateDto = {
    properties: {
        entityType: {
            type: 'string',
            isRequired: true,
            maxLength: 64,
        },
        name: {
            type: 'string',
            isRequired: true,
            maxLength: 32,
        },
    },
} as const;
