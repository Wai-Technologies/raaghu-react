/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyDto = {
    properties: {
        type: {
            type: 'string',
            isNullable: true,
        },
        typeSimple: {
            type: 'string',
            isNullable: true,
        },
        displayName: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_LocalizableStringDto',
        },
        api: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyApiDto',
        },
        ui: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyUiDto',
        },
        attributes: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyAttributeDto',
            },
            isNullable: true,
        },
        configuration: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isNullable: true,
        },
        defaultValue: {
            properties: {
            },
            isNullable: true,
        },
    },
} as const;
