/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_PermissionManagement_PermissionGroupDto = {
    properties: {
        name: {
            type: 'string',
            isNullable: true,
        },
        displayName: {
            type: 'string',
            isNullable: true,
        },
        displayNameKey: {
            type: 'string',
            isNullable: true,
        },
        displayNameResource: {
            type: 'string',
            isNullable: true,
        },
        permissions: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_PermissionManagement_PermissionGrantInfoDto',
            },
            isNullable: true,
        },
    },
} as const;
