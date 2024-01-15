/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Blogs_CreateBlogDto = {
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
        name: {
            type: 'string',
            isRequired: true,
            maxLength: 64,
            minLength: 1,
        },
        slug: {
            type: 'string',
            isRequired: true,
            maxLength: 64,
            minLength: 1,
        },
    },
} as const;
