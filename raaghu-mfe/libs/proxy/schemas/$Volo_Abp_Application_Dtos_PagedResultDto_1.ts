/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Application_Dtos_PagedResultDto_1 = {
    properties: {
        items: {
            type: 'array',
            contains: {
                type: 'Volo_Saas_Host_Dtos_SaasTenantDto',
            },
            isNullable: true,
        },
        totalCount: {
            type: 'number',
            format: 'int64',
        },
    },
} as const;
