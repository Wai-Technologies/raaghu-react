/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyApiDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyApiDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyAttributeDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyAttributeDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyUiDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyUiDto';
import type { Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_LocalizableStringDto } from './Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_LocalizableStringDto';

export type Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyDto = {
    type?: string | null;
    typeSimple?: string | null;
    displayName?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_LocalizableStringDto;
    api?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyApiDto;
    ui?: Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyUiDto;
    attributes?: Array<Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_ObjectExtending_ExtensionPropertyAttributeDto> | null;
    configuration?: Record<string, any> | null;
    defaultValue?: any;
};

