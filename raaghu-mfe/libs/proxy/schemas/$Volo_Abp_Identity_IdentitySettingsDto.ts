/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentitySettingsDto = {
    properties: {
        password: {
            type: 'Volo_Abp_Identity_IdentityPasswordSettingsDto',
        },
        lockout: {
            type: 'Volo_Abp_Identity_IdentityLockoutSettingsDto',
        },
        signIn: {
            type: 'Volo_Abp_Identity_IdentitySignInSettingsDto',
        },
        user: {
            type: 'Volo_Abp_Identity_IdentityUserSettingsDto',
        },
    },
} as const;
