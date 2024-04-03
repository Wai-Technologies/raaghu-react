/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationConfigurationDto = {
    properties: {
        localization: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationConfigurationDto',
        },
        auth: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationAuthConfigurationDto',
        },
        setting: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationSettingConfigurationDto',
        },
        currentUser: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_CurrentUserDto',
        },
        features: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationFeatureConfigurationDto',
        },
        globalFeatures: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationGlobalFeatureConfigurationDto',
        },
        multiTenancy: {
            type: 'Volo_Abp_AspNetCore_Mvc_MultiTenancy_MultiTenancyInfoDto',
        },
        currentTenant: {
            type: 'Volo_Abp_AspNetCore_Mvc_MultiTenancy_CurrentTenantDto',
        },
        timing: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_TimingDto',
        },
        clock: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ClockDto',
        },
        objectExtensions: {
            type: 'Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ObjectExtensionsDto',
        },
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isNullable: true,
        },
    },
} as const;
