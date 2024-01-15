/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto } from './Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto';
import type { Volo_Saas_TenantActivationState } from './Volo_Saas_TenantActivationState';

export type Volo_Saas_Host_Dtos_SaasTenantCreateDto = {
    readonly extraProperties?: Record<string, any> | null;
    name: string;
    editionId?: string | null;
    activationState?: Volo_Saas_TenantActivationState;
    activationEndDate?: string | null;
    editionEndDateUtc?: string | null;
    adminEmailAddress: string;
    adminPassword: string;
    connectionStrings?: Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto;
};

