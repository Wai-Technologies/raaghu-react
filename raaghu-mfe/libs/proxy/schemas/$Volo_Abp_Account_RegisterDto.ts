/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_RegisterDto = {
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
        userName: {
            type: 'string',
            isRequired: true,
            maxLength: 256,
        },
        emailAddress: {
            type: 'string',
            isRequired: true,
            format: 'email',
            maxLength: 256,
        },
        password: {
            type: 'string',
            isRequired: true,
            format: 'password',
            maxLength: 128,
        },
        appName: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        returnUrl: {
            type: 'string',
            isNullable: true,
        },
        returnUrlHash: {
            type: 'string',
            isNullable: true,
        },
        captchaResponse: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
