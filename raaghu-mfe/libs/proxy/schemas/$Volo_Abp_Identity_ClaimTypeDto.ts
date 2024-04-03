/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_ClaimTypeDto = {
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
        name: {
            type: 'string',
            isNullable: true,
        },
        required: {
            type: 'boolean',
        },
        isStatic: {
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
        valueTypeAsString: {
            type: 'string',
            isNullable: true,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
