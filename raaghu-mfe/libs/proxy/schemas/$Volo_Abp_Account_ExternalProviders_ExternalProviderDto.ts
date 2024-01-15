/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_ExternalProviders_ExternalProviderDto = {
    properties: {
        providers: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Account_ExternalProviders_ExternalProviderItemDto',
            },
            isNullable: true,
        },
    },
} as const;
