/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_SendPasswordResetCodeDto = {
    properties: {
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            maxLength: 256,
        },
        appName: {
            type: 'string',
            isRequired: true,
        },
        returnUrl: {
            type: 'string',
            isNullable: true,
        },
        returnUrlHash: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
