/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Saas_Host_Dtos_SaasTenantDatabasesDto = {
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
        databases: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
    },
} as const;
