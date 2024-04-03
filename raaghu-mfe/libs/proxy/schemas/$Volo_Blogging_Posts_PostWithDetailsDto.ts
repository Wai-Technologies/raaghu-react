/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Blogging_Posts_PostWithDetailsDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastModifierId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        isDeleted: {
            type: 'boolean',
        },
        deleterId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deletionTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        blogId: {
            type: 'string',
            format: 'uuid',
        },
        title: {
            type: 'string',
            isNullable: true,
        },
        coverImage: {
            type: 'string',
            isNullable: true,
        },
        url: {
            type: 'string',
            isNullable: true,
        },
        content: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        readCount: {
            type: 'number',
            format: 'int32',
        },
        commentCount: {
            type: 'number',
            format: 'int32',
        },
        writer: {
            type: 'Volo_Blogging_Posts_BlogUserDto',
        },
        tags: {
            type: 'array',
            contains: {
                type: 'Volo_Blogging_Tagging_Dtos_TagDto',
            },
            isNullable: true,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
