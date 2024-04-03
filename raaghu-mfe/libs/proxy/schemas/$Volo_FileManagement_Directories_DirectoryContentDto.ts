/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_FileManagement_Directories_DirectoryContentDto = {
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
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastModifierId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        isDirectory: {
            type: 'boolean',
        },
        size: {
            type: 'number',
            format: 'int32',
        },
        iconInfo: {
            type: 'Volo_FileManagement_Files_FileIconInfo',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
