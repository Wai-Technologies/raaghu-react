/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_Identity_IdentityClaimValueType } from './Volo_Abp_Identity_IdentityClaimValueType';

export type Volo_Abp_Identity_ClaimTypeDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    name?: string | null;
    required?: boolean;
    isStatic?: boolean;
    regex?: string | null;
    regexDescription?: string | null;
    description?: string | null;
    valueType?: Volo_Abp_Identity_IdentityClaimValueType;
    valueTypeAsString?: string | null;
    concurrencyStamp?: string | null;
};

