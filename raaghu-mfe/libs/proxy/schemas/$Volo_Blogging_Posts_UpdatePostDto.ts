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
            minLength: 1,
        },
        coverImage: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        url: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        content: {
            type: 'string',
            isRequired: true,
            minLength: 1,
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
