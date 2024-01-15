/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_Abp_AuditLogging_AuditLogActionDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    tenantId?: string | null;
    auditLogId?: string;
    serviceName?: string | null;
    methodName?: string | null;
    parameters?: string | null;
    executionTime?: string;
    executionDuration?: number;
};

