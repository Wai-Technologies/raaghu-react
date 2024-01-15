/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_AuditLogging_EntityPropertyChangeDto = {
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
        entityChangeId: {
            type: 'string',
            format: 'uuid',
        },
        newValue: {
            type: 'string',
            isNullable: true,
        },
        originalValue: {
            type: 'string',
            isNullable: true,
        },
        propertyName: {
            type: 'string',
            isNullable: true,
        },
        propertyTypeFullName: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
