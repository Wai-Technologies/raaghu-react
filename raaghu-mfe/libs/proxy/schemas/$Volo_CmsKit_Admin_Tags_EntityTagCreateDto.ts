/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Tags_EntityTagCreateDto = {
    properties: {
        tagName: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        entityType: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        entityId: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
    },
} as const;
