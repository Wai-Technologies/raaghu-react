/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_SendTwoFactorCodeInput = {
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        provider: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        token: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
    },
} as const;
