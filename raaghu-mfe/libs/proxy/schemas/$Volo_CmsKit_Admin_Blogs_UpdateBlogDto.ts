/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Blogs_UpdateBlogDto = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
            maxLength: 64,
        },
        slug: {
            type: 'string',
            isRequired: true,
            maxLength: 64,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
