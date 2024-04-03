/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_OrganizationUnitWithDetailsDto = {
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
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastModifierId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        isDeleted: {
            type: 'boolean',
        },
        deleterId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deletionTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        parentId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        code: {
            type: 'string',
            isNullable: true,
        },
        displayName: {
            type: 'string',
            isNullable: true,
        },
        roles: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Identity_IdentityRoleDto',
            },
            isNullable: true,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
