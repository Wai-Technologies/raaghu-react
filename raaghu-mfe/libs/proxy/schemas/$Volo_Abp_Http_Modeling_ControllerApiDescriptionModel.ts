/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Http_Modeling_ControllerApiDescriptionModel = {
    properties: {
        controllerName: {
            type: 'string',
            isNullable: true,
        },
        controllerGroupName: {
            type: 'string',
            isNullable: true,
        },
        isRemoteService: {
            type: 'boolean',
        },
        isIntegrationService: {
            type: 'boolean',
        },
        apiVersion: {
            type: 'string',
            isNullable: true,
        },
        type: {
            type: 'string',
            isNullable: true,
        },
        interfaces: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Http_Modeling_ControllerInterfaceApiDescriptionModel',
            },
            isNullable: true,
        },
        actions: {
            type: 'dictionary',
            contains: {
                type: 'Volo_Abp_Http_Modeling_ActionApiDescriptionModel',
            },
            isNullable: true,
        },
    },
} as const;
