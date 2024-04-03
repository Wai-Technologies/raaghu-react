/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentityRoleDto = {
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
        id: {
            type: 'string',
            format: 'uuid',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        isDefault: {
            type: 'boolean',
        },
        isStatic: {
            type: 'boolean',
        },
        isPublic: {
            type: 'boolean',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
