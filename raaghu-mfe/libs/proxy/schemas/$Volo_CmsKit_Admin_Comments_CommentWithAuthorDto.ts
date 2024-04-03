/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Comments_CommentWithAuthorDto = {
    properties: {
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
        repliedCommentId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        creatorId: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        author: {
            type: 'Volo_CmsKit_Admin_Comments_CmsUserDto',
        },
    },
} as const;
