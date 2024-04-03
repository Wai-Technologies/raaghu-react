/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_ResetPasswordDto = {
    properties: {
        userId: {
            type: 'string',
            format: 'uuid',
        },
        resetToken: {
            type: 'string',
            isRequired: true,
        },
        password: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
