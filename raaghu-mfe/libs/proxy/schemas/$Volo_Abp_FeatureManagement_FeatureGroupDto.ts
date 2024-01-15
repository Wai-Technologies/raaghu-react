/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_FeatureManagement_FeatureGroupDto = {
    properties: {
        name: {
            type: 'string',
            isNullable: true,
        },
        displayName: {
            type: 'string',
            isNullable: true,
        },
        features: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_FeatureManagement_FeatureDto',
            },
            isNullable: true,
        },
    },
} as const;
