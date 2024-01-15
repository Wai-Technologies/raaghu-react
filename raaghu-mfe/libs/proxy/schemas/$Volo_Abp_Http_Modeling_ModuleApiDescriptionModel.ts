/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Http_Modeling_ModuleApiDescriptionModel = {
    properties: {
        rootPath: {
            type: 'string',
            isNullable: true,
        },
        remoteServiceName: {
            type: 'string',
            isNullable: true,
        },
        controllers: {
            type: 'dictionary',
            contains: {
                type: 'Volo_Abp_Http_Modeling_ControllerApiDescriptionModel',
            },
            isNullable: true,
        },
    },
} as const;
