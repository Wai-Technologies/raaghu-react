/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_ExternalProviders_ExternalProviderItemWithSecretDto = {
    properties: {
        success: {
            type: 'boolean',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        enabled: {
            type: 'boolean',
        },
        properties: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Account_ExternalProviders_ExternalProviderSettingsProperty',
            },
            isNullable: true,
        },
        secretProperties: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Account_ExternalProviders_ExternalProviderSettingsProperty',
            },
            isNullable: true,
        },
    },
} as const;
