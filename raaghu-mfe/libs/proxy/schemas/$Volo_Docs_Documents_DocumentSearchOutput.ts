/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Docs_Documents_DocumentSearchOutput = {
    properties: {
        name: {
            type: 'string',
            isNullable: true,
        },
        fileName: {
            type: 'string',
            isNullable: true,
        },
        version: {
            type: 'string',
            isNullable: true,
        },
        languageCode: {
            type: 'string',
            isNullable: true,
        },
        highlight: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
    },
} as const;
