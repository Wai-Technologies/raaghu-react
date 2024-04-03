/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_Account_ExternalProviders_ExternalProviderSettingsProperty } from './Volo_Abp_Account_ExternalProviders_ExternalProviderSettingsProperty';

export type Volo_Abp_Account_UpdateExternalProviderDto = {
    name?: string | null;
    enabled?: boolean;
    properties?: Array<Volo_Abp_Account_ExternalProviders_ExternalProviderSettingsProperty> | null;
    secretProperties?: Array<Volo_Abp_Account_ExternalProviders_ExternalProviderSettingsProperty> | null;
};

