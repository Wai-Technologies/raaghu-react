/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Blogging_Comments_Dtos_CommentWithRepliesDto = {
    properties: {
        comment: {
            type: 'Volo_Blogging_Comments_Dtos_CommentWithDetailsDto',
        },
        replies: {
            type: 'array',
            contains: {
                type: 'Volo_Blogging_Comments_Dtos_CommentWithDetailsDto',
            },
            isNullable: true,
        },
    },
} as const;
