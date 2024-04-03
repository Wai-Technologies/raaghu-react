/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Blogging_Admin_Blogs_UpdateBlogDto = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        shortName: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
