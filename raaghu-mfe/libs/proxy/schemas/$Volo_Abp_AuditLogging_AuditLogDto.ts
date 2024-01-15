/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_AuditLogging_AuditLogDto = {
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
        userId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        userName: {
            type: 'string',
            isNullable: true,
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        tenantName: {
            type: 'string',
            isNullable: true,
        },
        impersonatorUserId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        impersonatorUserName: {
            type: 'string',
            isNullable: true,
        },
        impersonatorTenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        impersonatorTenantName: {
            type: 'string',
            isNullable: true,
        },
        executionTime: {
            type: 'string',
            format: 'date-time',
        },
        executionDuration: {
            type: 'number',
            format: 'int32',
        },
        clientIpAddress: {
            type: 'string',
            isNullable: true,
        },
        clientName: {
            type: 'string',
            isNullable: true,
        },
        browserInfo: {
            type: 'string',
            isNullable: true,
        },
        httpMethod: {
            type: 'string',
            isNullable: true,
        },
        url: {
            type: 'string',
            isNullable: true,
        },
        exceptions: {
            type: 'string',
            isNullable: true,
        },
        comments: {
            type: 'string',
            isNullable: true,
        },
        httpStatusCode: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        applicationName: {
            type: 'string',
            isNullable: true,
        },
        correlationId: {
            type: 'string',
            isNullable: true,
        },
        entityChanges: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_AuditLogging_EntityChangeDto',
            },
            isNullable: true,
        },
        actions: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_AuditLogging_AuditLogActionDto',
            },
            isNullable: true,
        },
    },
} as const;
