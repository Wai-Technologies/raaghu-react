/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_UserLoginInfo = {
    properties: {
        userNameOrEmailAddress: {
            type: 'string',
            isRequired: true,
            maxLength: 255,
        },
        password: {
            type: 'string',
            isRequired: true,
            format: 'password',
            maxLength: 128,
        },
        rememberMe: {
            type: 'boolean',
        },
        tenanId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
