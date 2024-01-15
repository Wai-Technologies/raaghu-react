/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_FileManagement_Files_FileUploadPreInfoRequest = {
    properties: {
        directoryId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        fileName: {
            type: 'string',
            isNullable: true,
        },
        size: {
            type: 'number',
            format: 'int64',
        },
    },
} as const;
