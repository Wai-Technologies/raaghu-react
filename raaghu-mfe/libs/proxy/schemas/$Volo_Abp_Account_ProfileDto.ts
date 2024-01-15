/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_ProfileDto = {
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
            isNullable: true,
        },
        email: {
            type: 'string',
            isNullable: true,
        },
        emailConfirmed: {
            type: 'boolean',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        surname: {
            type: 'string',
            isNullable: true,
        },
        phoneNumber: {
            type: 'string',
            isNullable: true,
        },
        phoneNumberConfirmed: {
            type: 'boolean',
        },
        isExternal: {
            type: 'boolean',
        },
        hasPassword: {
            type: 'boolean',
        },
        supportsMultipleTimezone: {
            type: 'boolean',
        },
        timezone: {
            type: 'string',
            isNullable: true,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
