/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto = {
    properties: {
        success: {
            type: 'boolean',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        isActive: {
            type: 'boolean',
        },
    },
} as const;
