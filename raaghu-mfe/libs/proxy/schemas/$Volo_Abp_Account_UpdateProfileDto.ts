/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_UpdateProfileDto = {
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
        email: {
            type: 'string',
            isNullable: true,
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
        phoneNumber: {
            type: 'string',
            isNullable: true,
            maxLength: 16,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
