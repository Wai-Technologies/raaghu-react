/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_AuditLogging_AuditLogActionDto = {
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
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        auditLogId: {
            type: 'string',
            format: 'uuid',
        },
        serviceName: {
            type: 'string',
            isNullable: true,
        },
        methodName: {
            type: 'string',
            isNullable: true,
        },
        parameters: {
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
    },
} as const;
