/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Docs_Documents_NavigationNode = {
    properties: {
        text: {
            type: 'string',
            isNullable: true,
        },
        path: {
            type: 'string',
            isNullable: true,
        },
        items: {
            type: 'array',
            contains: {
                type: 'Volo_Docs_Documents_NavigationNode',
            },
            isNullable: true,
        },
        isLeaf: {
            type: 'boolean',
            isReadOnly: true,
        },
        hasChildItems: {
            type: 'boolean',
            isReadOnly: true,
        },
        isEmpty: {
            type: 'boolean',
            isReadOnly: true,
        },
        creationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastUpdatedTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastSignificantUpdateTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
    },
} as const;
