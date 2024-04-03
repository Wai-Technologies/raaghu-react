/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_FileManagement_Directories_MoveDirectoryInput = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        newParentId: {
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
