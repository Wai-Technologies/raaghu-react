/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Comments_CreateCommentInput = {
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
        repliedCommentId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
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
        url: {
            type: 'string',
            isNullable: true,
        },
        idempotencyToken: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
    },
} as const;
