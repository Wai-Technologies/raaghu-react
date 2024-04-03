/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Comments_UpdateCommentInput = {
    properties: {
        text: {
            type: 'string',
            isRequired: true,
            maxLength: 512,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
