/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Saas_TenantActivationState } from './Volo_Saas_TenantActivationState';

export type Volo_Saas_Host_Dtos_SaasTenantDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    name?: string | null;
    editionId?: string | null;
    editionEndDateUtc?: string | null;
    editionName?: string | null;
    hasDefaultConnectionString?: boolean;
    activationState?: Volo_Saas_TenantActivationState;
    activationEndDate?: string | null;
    concurrencyStamp?: string | null;
};

