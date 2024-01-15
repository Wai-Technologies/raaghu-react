/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_Abp_Identity_IdentityOAuthSettingsDto = {
    enableOAuthLogin?: boolean;
    clientId: string;
    clientSecret?: string | null;
    authority: string;
    scope?: string | null;
    requireHttpsMetadata?: boolean;
    validateEndpoints?: boolean;
    validateIssuerName?: boolean;
};

