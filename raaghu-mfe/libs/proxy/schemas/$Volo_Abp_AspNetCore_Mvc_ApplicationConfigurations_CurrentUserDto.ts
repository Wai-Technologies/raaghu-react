/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_AspNetCore_Mvc_ApplicationConfigurations_CurrentUserDto = {
    properties: {
        isAuthenticated: {
            type: 'boolean',
        },
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        impersonatorUserId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        impersonatorTenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        impersonatorUserName: {
            type: 'string',
            isNullable: true,
        },
        impersonatorTenantName: {
            type: 'string',
            isNullable: true,
        },
        userName: {
            type: 'string',
            isNullable: true,
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        surName: {
            type: 'string',
            isNullable: true,
        },
        email: {
            type: 'string',
            isNullable: true,
        },
        emailVerified: {
            type: 'boolean',
        },
        phoneNumber: {
            type: 'string',
            isNullable: true,
        },
        phoneNumberVerified: {
            type: 'boolean',
        },
        roles: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
    },
} as const;
