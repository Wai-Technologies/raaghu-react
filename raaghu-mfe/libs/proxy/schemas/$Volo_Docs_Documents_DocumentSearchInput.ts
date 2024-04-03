/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Docs_Documents_DocumentSearchInput = {
    properties: {
        context: {
            type: 'string',
            isNullable: true,
        },
        projectId: {
            type: 'string',
            format: 'uuid',
        },
        languageCode: {
            type: 'string',
            isNullable: true,
        },
        version: {
            type: 'string',
            isNullable: true,
        },
        skipCount: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        maxResultCount: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
    },
} as const;
