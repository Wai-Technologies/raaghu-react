/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Comments_UpdateCommentInput = {
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
        text: {
            type: 'string',
            isRequired: true,
            maxLength: 512,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
        captchaToken: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        captchaAnswer: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
