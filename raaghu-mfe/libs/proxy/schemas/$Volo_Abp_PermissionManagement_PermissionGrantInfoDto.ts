/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_PermissionManagement_PermissionGrantInfoDto = {
    properties: {
        name: {
            type: 'string',
            isNullable: true,
        },
        displayName: {
            type: 'string',
            isNullable: true,
        },
        parentName: {
            type: 'string',
            isNullable: true,
        },
        isGranted: {
            type: 'boolean',
        },
        allowedProviders: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
        grantedProviders: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_PermissionManagement_ProviderInfoDto',
            },
            isNullable: true,
        },
    },
} as const;
