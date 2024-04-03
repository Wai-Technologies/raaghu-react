/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Blogging_Comments_Dtos_CreateCommentDto = {
    properties: {
        repliedCommentId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        postId: {
            type: 'string',
            format: 'uuid',
        },
        text: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
