/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_FileManagement_Files_MoveFileInput = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        newDirectoryId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
