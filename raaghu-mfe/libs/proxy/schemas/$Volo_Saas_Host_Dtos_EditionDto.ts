/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Saas_Host_Dtos_EditionDto = {
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
        displayName: {
            type: 'string',
            isNullable: true,
        },
        planId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        planName: {
            type: 'string',
            isNullable: true,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
        tenantCount: {
            type: 'number',
            format: 'int64',
        },
    },
} as const;
