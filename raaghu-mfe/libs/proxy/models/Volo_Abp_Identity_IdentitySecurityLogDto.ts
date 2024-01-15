/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_Abp_Identity_IdentitySecurityLogDto = {
    id?: string;
    tenantId?: string | null;
    applicationName?: string | null;
    identity?: string | null;
    action?: string | null;
    userId?: string | null;
    userName?: string | null;
    tenantName?: string | null;
    clientId?: string | null;
    correlationId?: string | null;
    clientIpAddress?: string | null;
    browserInfo?: string | null;
    creationTime?: string;
    extraProperties?: Record<string, any> | null;
};

