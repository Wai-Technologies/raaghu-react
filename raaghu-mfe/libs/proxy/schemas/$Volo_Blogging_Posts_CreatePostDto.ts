/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Blogging_Posts_CreatePostDto = {
    properties: {
        blogId: {
            type: 'string',
            format: 'uuid',
        },
        title: {
            type: 'string',
            isRequired: true,
            maxLength: 512,
        },
        coverImage: {
            type: 'string',
            isRequired: true,
        },
        url: {
            type: 'string',
            isRequired: true,
            maxLength: 64,
        },
        content: {
            type: 'string',
            isRequired: true,
            maxLength: 1048576,
        },
        tags: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 1000,
        },
    },
} as const;
