/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_OrganizationUnitRoleDto = {
    properties: {
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        organizationUnitId: {
            type: 'string',
            format: 'uuid',
        },
        roleId: {
            type: 'string',
            format: 'uuid',
        },
    },
} as const;
