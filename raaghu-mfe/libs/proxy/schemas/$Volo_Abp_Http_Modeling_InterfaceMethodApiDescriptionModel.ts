/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Http_Modeling_InterfaceMethodApiDescriptionModel = {
    properties: {
        name: {
            type: 'string',
            isNullable: true,
        },
        parametersOnMethod: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Http_Modeling_MethodParameterApiDescriptionModel',
            },
            isNullable: true,
        },
        returnValue: {
            type: 'Volo_Abp_Http_Modeling_ReturnValueApiDescriptionModel',
        },
    },
} as const;
