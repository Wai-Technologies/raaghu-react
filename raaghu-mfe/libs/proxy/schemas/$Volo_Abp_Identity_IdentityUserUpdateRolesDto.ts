/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentityUserUpdateRolesDto = {
    properties: {
        roleNames: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
    },
} as const;
