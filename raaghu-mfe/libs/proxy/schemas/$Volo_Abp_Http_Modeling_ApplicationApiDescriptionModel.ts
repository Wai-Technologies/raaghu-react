/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Http_Modeling_ApplicationApiDescriptionModel = {
    properties: {
        modules: {
            type: 'dictionary',
            contains: {
                type: 'Volo_Abp_Http_Modeling_ModuleApiDescriptionModel',
            },
            isNullable: true,
        },
        types: {
            type: 'dictionary',
            contains: {
                type: 'Volo_Abp_Http_Modeling_TypeApiDescriptionModel',
            },
            isNullable: true,
        },
    },
} as const;
