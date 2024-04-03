/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_AuditLogging_EntityChangeDto = {
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
        auditLogId: {
            type: 'string',
            format: 'uuid',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        changeTime: {
            type: 'string',
            format: 'date-time',
        },
        changeType: {
            type: 'Volo_Abp_Auditing_EntityChangeType',
        },
        entityId: {
            type: 'string',
            isNullable: true,
        },
        entityTypeFullName: {
            type: 'string',
            isNullable: true,
        },
        propertyChanges: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_AuditLogging_EntityPropertyChangeDto',
            },
            isNullable: true,
        },
    },
} as const;
