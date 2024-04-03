/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Blogging_Posts_BlogUserDto = {
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
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
                isNullable: true,
            },
            isNullable: true,
        },
    },
} as const;
