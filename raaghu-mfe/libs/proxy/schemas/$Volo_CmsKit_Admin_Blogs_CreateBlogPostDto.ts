/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Blogs_CreateBlogPostDto = {
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
        blogId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        title: {
            type: 'string',
            isRequired: true,
            maxLength: 64,
            minLength: 1,
        },
        slug: {
            type: 'string',
            isRequired: true,
            maxLength: 256,
            minLength: 2,
        },
        shortDescription: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        content: {
            type: 'string',
            isNullable: true,
            maxLength: 2147483647,
        },
        coverImageMediaId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
