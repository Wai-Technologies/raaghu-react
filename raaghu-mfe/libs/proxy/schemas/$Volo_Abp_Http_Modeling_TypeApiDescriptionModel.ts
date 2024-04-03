/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Http_Modeling_TypeApiDescriptionModel = {
    properties: {
        baseType: {
            type: 'string',
            isNullable: true,
        },
        isEnum: {
            type: 'boolean',
        },
        enumNames: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
        enumValues: {
            type: 'array',
            contains: {
                properties: {
                },
            },
            isNullable: true,
        },
        genericArguments: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
        properties: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Http_Modeling_PropertyApiDescriptionModel',
            },
            isNullable: true,
        },
    },
} as const;
