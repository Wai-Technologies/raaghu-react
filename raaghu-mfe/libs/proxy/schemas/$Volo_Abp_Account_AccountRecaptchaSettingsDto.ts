/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_AccountRecaptchaSettingsDto = {
    properties: {
        useCaptchaOnLogin: {
            type: 'boolean',
        },
        useCaptchaOnRegistration: {
            type: 'boolean',
        },
        verifyBaseUrl: {
            type: 'string',
            isNullable: true,
        },
        siteKey: {
            type: 'string',
            isNullable: true,
        },
        siteSecret: {
            type: 'string',
            isNullable: true,
        },
        version: {
            type: 'number',
            format: 'int32',
            maximum: 3,
            minimum: 2,
        },
        score: {
            type: 'number',
            format: 'double',
            maximum: 1,
            minimum: 0.1,
        },
    },
} as const;
