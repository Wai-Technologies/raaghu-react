/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Saas_TenantActivationState } from './Volo_Saas_TenantActivationState';

export type Volo_Saas_Host_Dtos_SaasTenantUpdateDto = {
    readonly extraProperties?: Record<string, any> | null;
    name: string;
    editionId?: string | null;
    activationState?: Volo_Saas_TenantActivationState;
    activationEndDate?: string | null;
    editionEndDateUtc?: string | null;
    concurrencyStamp?: string | null;
};

