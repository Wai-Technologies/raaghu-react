/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Docs_Documents_DocumentParameterDto = {
    properties: {
        name: {
            type: 'string',
            isNullable: true,
        },
        displayName: {
            type: 'string',
            isNullable: true,
        },
        values: {
            type: 'dictionary',
            contains: {
                type: 'string',
                isNullable: true,
            },
            isNullable: true,
        },
    },
} as const;
