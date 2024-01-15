/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentityOAuthSettingsDto = {
    properties: {
        enableOAuthLogin: {
            type: 'boolean',
        },
        clientId: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        clientSecret: {
            type: 'string',
            isNullable: true,
        },
        authority: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        scope: {
            type: 'string',
            isNullable: true,
        },
        requireHttpsMetadata: {
            type: 'boolean',
        },
        validateEndpoints: {
            type: 'boolean',
        },
        validateIssuerName: {
            type: 'boolean',
        },
    },
} as const;
