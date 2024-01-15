/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Blogging_Comments_Dtos_UpdateCommentDto = {
    properties: {
        text: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
