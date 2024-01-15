/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_AuditLogging_AuditLogActionDto } from './Volo_Abp_AuditLogging_AuditLogActionDto';
import type { Volo_Abp_AuditLogging_EntityChangeDto } from './Volo_Abp_AuditLogging_EntityChangeDto';

export type Volo_Abp_AuditLogging_AuditLogDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    userId?: string | null;
    userName?: string | null;
    tenantId?: string | null;
    tenantName?: string | null;
    impersonatorUserId?: string | null;
    impersonatorUserName?: string | null;
    impersonatorTenantId?: string | null;
    impersonatorTenantName?: string | null;
    executionTime?: string;
    executionDuration?: number;
    clientIpAddress?: string | null;
    clientName?: string | null;
    browserInfo?: string | null;
    httpMethod?: string | null;
    url?: string | null;
    exceptions?: string | null;
    comments?: string | null;
    httpStatusCode?: number | null;
    applicationName?: string | null;
    correlationId?: string | null;
    entityChanges?: Array<Volo_Abp_AuditLogging_EntityChangeDto> | null;
    actions?: Array<Volo_Abp_AuditLogging_AuditLogActionDto> | null;
};

