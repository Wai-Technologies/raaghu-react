/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Blogging_Posts_UpdatePostDto = {
    properties: {
        blogId: {
            type: 'string',
            format: 'uuid',
        },
        title: {
            type: 'string',
            isRequired: true,
        },
        coverImage: {
            type: 'string',
            isRequired: true,
        },
        url: {
            type: 'string',
            isRequired: true,
        },
        content: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        tags: {
            type: 'string',
            isNullable: true,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
