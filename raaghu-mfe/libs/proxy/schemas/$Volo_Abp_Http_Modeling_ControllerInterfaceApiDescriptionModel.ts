/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Http_Modeling_ControllerInterfaceApiDescriptionModel = {
    properties: {
        type: {
            type: 'string',
            isNullable: true,
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        methods: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Http_Modeling_InterfaceMethodApiDescriptionModel',
            },
            isNullable: true,
        },
    },
} as const;
