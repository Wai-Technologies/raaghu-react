/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ObjectExtensionsDto = {
    properties: {
        modules: {
            type: 'dictionary',
            contains: {
                type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ModuleExtensionDto',
            },
            isNullable: true,
        },
        enums: {
            type: 'dictionary',
            contains: {
                type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionEnumDto',
            },
            isNullable: true,
        },
    },
} as const;
