/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Saas_Host_Dtos_SaasTenantDatabaseConnectionStringsDto = {
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
        databaseName: {
            type: 'string',
            isNullable: true,
        },
        connectionString: {
            type: 'string',
            isNullable: true,
            maxLength: 1024,
        },
    },
} as const;
