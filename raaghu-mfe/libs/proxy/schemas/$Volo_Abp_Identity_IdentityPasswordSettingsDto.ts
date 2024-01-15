/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentityPasswordSettingsDto = {
    properties: {
        requiredLength: {
            type: 'number',
            format: 'int32',
            maximum: 128,
            minimum: 2,
        },
        requiredUniqueChars: {
            type: 'number',
            format: 'int32',
            maximum: 128,
            minimum: 1,
        },
        requireNonAlphanumeric: {
            type: 'boolean',
        },
        requireLowercase: {
            type: 'boolean',
        },
        requireUppercase: {
            type: 'boolean',
        },
        requireDigit: {
            type: 'boolean',
        },
        forceUsersToPeriodicallyChangePassword: {
            type: 'boolean',
        },
        passwordChangePeriodDays: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
