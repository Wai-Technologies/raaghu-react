/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_FeatureManagement_GetFeatureListResultDto = {
    properties: {
        groups: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_FeatureManagement_FeatureGroupDto',
            },
            isNullable: true,
        },
    },
} as const;
