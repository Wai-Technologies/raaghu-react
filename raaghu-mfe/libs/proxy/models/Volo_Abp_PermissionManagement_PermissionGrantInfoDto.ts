/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_PermissionManagement_ProviderInfoDto } from './Volo_Abp_PermissionManagement_ProviderInfoDto';

export type Volo_Abp_PermissionManagement_PermissionGrantInfoDto = {
    name?: string | null;
    displayName?: string | null;
    parentName?: string | null;
    isGranted?: boolean;
    allowedProviders?: Array<string> | null;
    grantedProviders?: Array<Volo_Abp_PermissionManagement_ProviderInfoDto> | null;
};

