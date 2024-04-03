/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_FeatureManagement_FeatureDto = {
    properties: {
        name: {
            type: 'string',
            isNullable: true,
        },
        displayName: {
            type: 'string',
            isNullable: true,
        },
        value: {
            type: 'string',
            isNullable: true,
        },
        provider: {
            type: 'Volo_Abp_FeatureManagement_FeatureProviderDto',
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        valueType: {
            type: 'Volo_Abp_Validation_StringValues_IStringValueType',
        },
        depth: {
            type: 'number',
            format: 'int32',
        },
        parentName: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
