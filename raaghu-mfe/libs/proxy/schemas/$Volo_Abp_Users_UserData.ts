/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Users_UserData = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        userName: {
            type: 'string',
            isNullable: true,
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        surname: {
            type: 'string',
            isNullable: true,
        },
        isActive: {
            type: 'boolean',
        },
        email: {
            type: 'string',
            isNullable: true,
        },
        emailConfirmed: {
            type: 'boolean',
        },
        phoneNumber: {
            type: 'string',
            isNullable: true,
        },
        phoneNumberConfirmed: {
            type: 'boolean',
        },
    },
} as const;
