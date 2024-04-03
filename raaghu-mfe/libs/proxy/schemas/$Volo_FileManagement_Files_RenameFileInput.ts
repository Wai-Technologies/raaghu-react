/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_FileManagement_Files_RenameFileInput = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
            maxLength: 255,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
