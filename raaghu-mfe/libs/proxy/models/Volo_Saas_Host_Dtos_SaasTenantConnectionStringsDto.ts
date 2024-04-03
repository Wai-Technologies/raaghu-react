/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Saas_Host_Dtos_SaasTenantDatabaseConnectionStringsDto } from './Volo_Saas_Host_Dtos_SaasTenantDatabaseConnectionStringsDto';

export type Volo_Saas_Host_Dtos_SaasTenantConnectionStringsDto = {
    readonly extraProperties?: Record<string, any> | null;
    default?: string | null;
    databases?: Array<Volo_Saas_Host_Dtos_SaasTenantDatabaseConnectionStringsDto> | null;
};

