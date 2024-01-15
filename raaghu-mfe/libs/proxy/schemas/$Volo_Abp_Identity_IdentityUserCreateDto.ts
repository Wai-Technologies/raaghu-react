/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentityUserCreateDto = {
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
        userName: {
            type: 'string',
            isRequired: true,
            maxLength: 256,
        },
        name: {
            type: 'string',
            isNullable: true,
            maxLength: 64,
        },
        surname: {
            type: 'string',
            isNullable: true,
            maxLength: 64,
        },
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            maxLength: 256,
        },
        phoneNumber: {
            type: 'string',
            isNullable: true,
            maxLength: 16,
        },
        isActive: {
            type: 'boolean',
        },
        shouldChangePasswordOnNextLogin: {
            type: 'boolean',
        },
        lockoutEnabled: {
            type: 'boolean',
        },
        roleNames: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
        organizationUnitIds: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        password: {
            type: 'string',
            isRequired: true,
            maxLength: 128,
        },
        sendConfirmationEmail: {
            type: 'boolean',
        },
    },
} as const;
