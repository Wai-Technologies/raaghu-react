/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Http_RemoteServiceErrorInfo = {
    properties: {
        code: {
            type: 'string',
            isNullable: true,
        },
        message: {
            type: 'string',
            isNullable: true,
        },
        details: {
            type: 'string',
            isNullable: true,
        },
        data: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isNullable: true,
        },
        validationErrors: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Http_RemoteServiceValidationErrorInfo',
            },
            isNullable: true,
        },
    },
} as const;
