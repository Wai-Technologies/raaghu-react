/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_SendEmailConfirmationTokenDto = {
    properties: {
        appName: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
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
