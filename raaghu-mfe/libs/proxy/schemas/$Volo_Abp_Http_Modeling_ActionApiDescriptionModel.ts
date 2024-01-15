/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Http_Modeling_ActionApiDescriptionModel = {
    properties: {
        uniqueName: {
            type: 'string',
            isNullable: true,
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        httpMethod: {
            type: 'string',
            isNullable: true,
        },
        url: {
            type: 'string',
            isNullable: true,
        },
        supportedVersions: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
        parametersOnMethod: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Http_Modeling_MethodParameterApiDescriptionModel',
            },
            isNullable: true,
        },
        parameters: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Http_Modeling_ParameterApiDescriptionModel',
            },
            isNullable: true,
        },
        returnValue: {
            type: 'Volo_Abp_Http_Modeling_ReturnValueApiDescriptionModel',
        },
        allowAnonymous: {
            type: 'boolean',
            isNullable: true,
        },
        implementFrom: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
