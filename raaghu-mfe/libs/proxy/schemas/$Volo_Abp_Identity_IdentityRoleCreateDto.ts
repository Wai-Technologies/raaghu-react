/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentityRoleCreateDto = {
    properties: {
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isReadOnly: true,
            isNullable: true,
        },
        name: {
            type: 'string',
            isRequired: true,
            maxLength: 256,
        },
        isDefault: {
            type: 'boolean',
        },
        isPublic: {
            type: 'boolean',
        },
    },
} as const;
