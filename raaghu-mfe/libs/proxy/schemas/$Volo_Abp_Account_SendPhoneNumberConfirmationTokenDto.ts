/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_SendPhoneNumberConfirmationTokenDto = {
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        phoneNumber: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
