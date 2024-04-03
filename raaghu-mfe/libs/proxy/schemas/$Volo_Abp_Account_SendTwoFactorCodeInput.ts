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
        },
        token: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
