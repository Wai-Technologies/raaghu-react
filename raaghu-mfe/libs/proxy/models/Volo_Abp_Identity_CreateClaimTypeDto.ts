/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_Identity_IdentityClaimValueType } from './Volo_Abp_Identity_IdentityClaimValueType';

export type Volo_Abp_Identity_CreateClaimTypeDto = {
    readonly extraProperties?: Record<string, any> | null;
    name: string;
    required?: boolean;
    regex?: string | null;
    regexDescription?: string | null;
    description?: string | null;
    valueType?: Volo_Abp_Identity_IdentityClaimValueType;
};

