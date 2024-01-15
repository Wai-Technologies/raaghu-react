/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Saas_Host_Dtos_SaasTenantCreateDto = {
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
        adminEmailAddress: {
            type: 'string',
            isRequired: true,
            format: 'email',
            maxLength: 256,
        },
        adminPassword: {
            type: 'string',
            isRequired: true,
            maxLength: 128,
        },
        connectionStrings: {
            type: 'Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto',
        },
    },
} as const;
