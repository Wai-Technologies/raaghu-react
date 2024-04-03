/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentityRoleClaimDto = {
    properties: {
        roleId: {
            type: 'string',
            format: 'uuid',
        },
        claimType: {
            type: 'string',
            isNullable: true,
        },
        claimValue: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
