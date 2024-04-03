/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Docs_Projects_ProjectDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        shortName: {
            type: 'string',
            isNullable: true,
        },
        format: {
            type: 'string',
            isNullable: true,
        },
        defaultDocumentName: {
            type: 'string',
            isNullable: true,
        },
        navigationDocumentName: {
            type: 'string',
            isNullable: true,
        },
        minimumVersion: {
            type: 'string',
            isNullable: true,
        },
        mainWebsiteUrl: {
            type: 'string',
            isNullable: true,
        },
        latestVersionBranchName: {
            type: 'string',
            isNullable: true,
        },
        documentStoreType: {
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
