/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Comments_CommentWithDetailsDto = {
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
        entityType: {
            type: 'string',
            isNullable: true,
        },
        entityId: {
            type: 'string',
            isNullable: true,
        },
        text: {
            type: 'string',
            isNullable: true,
        },
        creatorId: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        replies: {
            type: 'array',
            contains: {
                type: 'Volo_CmsKit_Public_Comments_CommentDto',
            },
            isNullable: true,
        },
        author: {
            type: 'Volo_CmsKit_Public_Comments_CmsUserDto',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
