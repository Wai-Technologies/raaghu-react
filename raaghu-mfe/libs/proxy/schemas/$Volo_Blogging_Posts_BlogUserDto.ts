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
        name: {
            type: 'string',
            isNullable: true,
        },
        surname: {
            type: 'string',
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
        phoneNumber: {
            type: 'string',
            isNullable: true,
        },
        phoneNumberConfirmed: {
            type: 'boolean',
        },
        webSite: {
            type: 'string',
            isNullable: true,
        },
        twitter: {
            type: 'string',
            isNullable: true,
        },
        github: {
            type: 'string',
            isNullable: true,
        },
        linkedin: {
            type: 'string',
            isNullable: true,
        },
        company: {
            type: 'string',
            isNullable: true,
        },
        jobTitle: {
            type: 'string',
            isNullable: true,
        },
        biography: {
            type: 'string',
            isNullable: true,
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
