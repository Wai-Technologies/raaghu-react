/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_Http_Modeling_ModuleApiDescriptionModel } from './Volo_Abp_Http_Modeling_ModuleApiDescriptionModel';
import type { Volo_Abp_Http_Modeling_TypeApiDescriptionModel } from './Volo_Abp_Http_Modeling_TypeApiDescriptionModel';

export type Volo_Abp_Http_Modeling_ApplicationApiDescriptionModel = {
    modules?: Record<string, Volo_Abp_Http_Modeling_ModuleApiDescriptionModel> | null;
    types?: Record<string, Volo_Abp_Http_Modeling_TypeApiDescriptionModel> | null;
};

