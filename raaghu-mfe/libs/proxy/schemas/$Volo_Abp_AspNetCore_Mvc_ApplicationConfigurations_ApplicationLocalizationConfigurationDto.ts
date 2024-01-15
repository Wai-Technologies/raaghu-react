/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationConfigurationDto = {
    properties: {
        values: {
            type: 'dictionary',
            contains: {
                type: 'dictionary',
                contains: {
                    type: 'string',
                },
            },
            isNullable: true,
        },
        resources: {
            type: 'dictionary',
            contains: {
                type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto',
            },
            isNullable: true,
        },
        languages: {
            type: 'array',
            contains: {
                type: 'Volo_Abp_Localization_LanguageInfo',
            },
            isNullable: true,
        },
        currentCulture: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_CurrentCultureDto',
        },
        defaultResourceName: {
            type: 'string',
            isNullable: true,
        },
        languagesMap: {
            type: 'dictionary',
            contains: {
                type: 'array',
                contains: {
                    type: 'Volo_Abp_NameValue',
                },
            },
            isNullable: true,
        },
        languageFilesMap: {
            type: 'dictionary',
            contains: {
                type: 'array',
                contains: {
                    type: 'Volo_Abp_NameValue',
                },
            },
            isNullable: true,
        },
    },
} as const;
