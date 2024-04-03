/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_VerifyEmailConfirmationTokenInput = {
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        token: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
