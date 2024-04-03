/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Blogs_BlogDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        slug: {
            type: 'string',
            isNullable: true,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
