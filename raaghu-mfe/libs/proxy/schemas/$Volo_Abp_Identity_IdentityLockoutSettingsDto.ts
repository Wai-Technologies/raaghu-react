/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentityLockoutSettingsDto = {
    properties: {
        allowedForNewUsers: {
            type: 'boolean',
        },
        lockoutDuration: {
            type: 'number',
            format: 'int32',
        },
        maxFailedAccessAttempts: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
