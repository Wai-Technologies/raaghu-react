/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_Auditing_EntityChangeType } from './Volo_Abp_Auditing_EntityChangeType';
import type { Volo_Abp_AuditLogging_EntityPropertyChangeDto } from './Volo_Abp_AuditLogging_EntityPropertyChangeDto';

export type Volo_Abp_AuditLogging_EntityChangeDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    auditLogId?: string;
    tenantId?: string | null;
    changeTime?: string;
    changeType?: Volo_Abp_Auditing_EntityChangeType;
    entityId?: string | null;
    entityTypeFullName?: string | null;
    propertyChanges?: Array<Volo_Abp_AuditLogging_EntityPropertyChangeDto> | null;
};

