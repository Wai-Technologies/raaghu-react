/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentitySecurityLogDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        applicationName: {
            type: 'string',
            isNullable: true,
        },
        identity: {
            type: 'string',
            isNullable: true,
        },
        action: {
            type: 'string',
            isNullable: true,
        },
        userId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        userName: {
            type: 'string',
            isNullable: true,
        },
        tenantName: {
            type: 'string',
            isNullable: true,
        },
        clientId: {
            type: 'string',
            isNullable: true,
        },
        correlationId: {
            type: 'string',
            isNullable: true,
        },
        clientIpAddress: {
            type: 'string',
            isNullable: true,
        },
        browserInfo: {
            type: 'string',
            isNullable: true,
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
                isNullable: true,
            },
            isNullable: true,
        },
    },
} as const;
