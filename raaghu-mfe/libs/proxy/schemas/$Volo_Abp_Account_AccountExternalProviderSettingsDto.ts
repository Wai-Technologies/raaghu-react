/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_AccountExternalProviderSettingsDto = {
    properties: {
        settings: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Account_ExternalProviders_ExternalProviderSettings',
            },
            isNullable: true,
        },
    },
} as const;
