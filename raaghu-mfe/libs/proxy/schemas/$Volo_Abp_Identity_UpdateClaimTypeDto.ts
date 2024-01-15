/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_UpdateClaimTypeDto = {
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
        name: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        required: {
            type: 'boolean',
        },
        regex: {
            type: 'string',
            isNullable: true,
        },
        regexDescription: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        valueType: {
            type: 'Volo_Abp_Identity_IdentityClaimValueType',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
