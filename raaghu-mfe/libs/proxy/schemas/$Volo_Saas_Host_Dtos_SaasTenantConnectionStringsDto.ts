/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto = {
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
        default: {
            type: 'string',
            isNullable: true,
            maxLength: 1024,
        },
        databases: {
            type: 'array',
            contains: {
                type: 'Volo_Saas_Host_Dtos_SaasTenantDatabaseConnectionStringsDto',
            },
            isNullable: true,
        },
    },
} as const;
