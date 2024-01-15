/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_PermissionManagement_UpdatePermissionsDto = {
    properties: {
        permissions: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_PermissionManagement_UpdatePermissionDto',
            },
            isNullable: true,
        },
    },
} as const;
