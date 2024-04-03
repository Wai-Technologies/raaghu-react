/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_CurrentCultureDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_CurrentCultureDto';
import type { Volo_Abp_Localization_LanguageInfo } from './Volo_Abp_Localization_LanguageInfo';
import type { Volo_Abp_NameValue } from './Volo_Abp_NameValue';

export type Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationConfigurationDto = {
    values?: Record<string, Record<string, string> | null> | null;
    resources?: Record<string, Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ApplicationLocalizationResourceDto> | null;
    languages?: Array<Volo_Abp_Localization_LanguageInfo> | null;
    currentCulture?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_CurrentCultureDto;
    defaultResourceName?: string | null;
    languagesMap?: Record<string, Array<Volo_Abp_NameValue> | null> | null;
    languageFilesMap?: Record<string, Array<Volo_Abp_NameValue> | null> | null;
};

