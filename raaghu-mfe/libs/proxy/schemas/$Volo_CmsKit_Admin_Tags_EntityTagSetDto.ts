/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Tags_EntityTagSetDto = {
    properties: {
        entityId: {
            type: 'string',
            isNullable: true,
        },
        entityType: {
            type: 'string',
            isNullable: true,
        },
        tags: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
    },
} as const;
