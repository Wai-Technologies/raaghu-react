/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Saas_Host_Dtos_SaasTenantDto = {
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
        editionId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        editionEndDateUtc: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        editionName: {
            type: 'string',
            isNullable: true,
        },
        hasDefaultConnectionString: {
            type: 'boolean',
        },
        activationState: {
            type: 'Volo_Saas_TenantActivationState',
        },
        activationEndDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
