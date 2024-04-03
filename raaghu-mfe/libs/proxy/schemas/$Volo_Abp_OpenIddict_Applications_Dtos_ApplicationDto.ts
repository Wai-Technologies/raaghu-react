/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto = {
    properties: {
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isReadOnly: true,
            isNullable: true,
        },
        id: {
            type: 'string',
            format: 'uuid',
        },
        clientId: {
            type: 'string',
            isNullable: true,
        },
        displayName: {
            type: 'string',
            isNullable: true,
        },
        type: {
            type: 'string',
            isNullable: true,
        },
        clientSecret: {
            type: 'string',
            isNullable: true,
        },
        consentType: {
            type: 'string',
            isNullable: true,
        },
        postLogoutRedirectUris: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
        redirectUris: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
        allowPasswordFlow: {
            type: 'boolean',
        },
        allowClientCredentialsFlow: {
            type: 'boolean',
        },
        allowAuthorizationCodeFlow: {
            type: 'boolean',
        },
        allowRefreshTokenFlow: {
            type: 'boolean',
        },
        allowHybridFlow: {
            type: 'boolean',
        },
        allowImplicitFlow: {
            type: 'boolean',
        },
        allowLogoutEndpoint: {
            type: 'boolean',
        },
        allowDeviceEndpoint: {
            type: 'boolean',
        },
        scopes: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
        clientUri: {
            type: 'string',
            isNullable: true,
        },
        logoUri: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
