/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_OrganizationUnitRoleInput = {
    properties: {
        roleIds: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
    },
} as const;
