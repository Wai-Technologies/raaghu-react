/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_FeatureManagement_FeatureProviderDto } from './Volo_Abp_FeatureManagement_FeatureProviderDto';
import type { Volo_Abp_Validation_StringValues_IStringValueType } from './Volo_Abp_Validation_StringValues_IStringValueType';

export type Volo_Abp_FeatureManagement_FeatureDto = {
    name?: string | null;
    displayName?: string | null;
    value?: string | null;
    provider?: Volo_Abp_FeatureManagement_FeatureProviderDto;
    description?: string | null;
    valueType?: Volo_Abp_Validation_StringValues_IStringValueType;
    depth?: number;
    parentName?: string | null;
};

