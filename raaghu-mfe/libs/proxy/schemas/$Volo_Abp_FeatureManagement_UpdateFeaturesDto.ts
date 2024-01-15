/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_FeatureManagement_UpdateFeaturesDto = {
    properties: {
        features: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_FeatureManagement_UpdateFeatureDto',
            },
            isNullable: true,
        },
    },
} as const;
