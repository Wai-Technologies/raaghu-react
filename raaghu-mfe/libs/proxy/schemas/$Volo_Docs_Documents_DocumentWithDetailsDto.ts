/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Docs_Documents_DocumentWithDetailsDto = {
    properties: {
        name: {
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
        fileName: {
            type: 'string',
            isNullable: true,
        },
        content: {
            type: 'string',
            isNullable: true,
        },
        format: {
            type: 'string',
            isNullable: true,
        },
        editLink: {
            type: 'string',
            isNullable: true,
        },
        rootUrl: {
            type: 'string',
            isNullable: true,
        },
        rawRootUrl: {
            type: 'string',
            isNullable: true,
        },
        localDirectory: {
            type: 'string',
            isNullable: true,
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        lastUpdatedTime: {
            type: 'string',
            format: 'date-time',
        },
        lastCachedTime: {
            type: 'string',
            format: 'date-time',
        },
        project: {
            type: 'Volo_Docs_Projects_ProjectDto',
        },
        contributors: {
            type: 'array',
            contains: {
                type: 'Volo_Docs_Documents_DocumentContributorDto',
            },
            isNullable: true,
        },
    },
} as const;
