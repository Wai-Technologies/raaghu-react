/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Saas_Host_Dtos_SaasTenantUpdateDto = {
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
            maxLength: 64,
        },
        editionId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        activationState: {
            type: 'Volo_Saas_TenantActivationState',
        },
        activationEndDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        editionEndDateUtc: {
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
