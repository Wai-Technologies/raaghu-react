/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_ChangePasswordInput = {
    properties: {
        currentPassword: {
            type: 'string',
            isNullable: true,
            maxLength: 128,
        },
        newPassword: {
            type: 'string',
            isRequired: true,
            maxLength: 128,
        },
    },
} as const;
