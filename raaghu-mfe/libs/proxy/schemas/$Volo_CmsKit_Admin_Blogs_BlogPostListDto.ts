/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Blogs_BlogPostListDto = {
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
        id: {
            type: 'string',
            format: 'uuid',
        },
        blogId: {
            type: 'string',
            format: 'uuid',
        },
        blogName: {
            type: 'string',
            isNullable: true,
        },
        title: {
            type: 'string',
            isNullable: true,
        },
        slug: {
            type: 'string',
            isNullable: true,
        },
        shortDescription: {
            type: 'string',
            isNullable: true,
        },
        content: {
            type: 'string',
            isNullable: true,
        },
        coverImageMediaId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        status: {
            type: 'Volo_CmsKit_Blogs_BlogPostStatus',
        },
    },
} as const;
