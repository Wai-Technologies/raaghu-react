/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_PermissionManagement_GetPermissionListResultDto = {
    properties: {
        entityDisplayName: {
            type: 'string',
            isNullable: true,
        },
        groups: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_PermissionManagement_PermissionGroupDto',
            },
            isNullable: true,
        },
    },
} as const;
