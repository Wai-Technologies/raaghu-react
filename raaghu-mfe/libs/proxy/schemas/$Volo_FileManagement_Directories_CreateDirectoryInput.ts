/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_FileManagement_Directories_CreateDirectoryInput = {
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
        parentId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        name: {
            type: 'string',
            isRequired: true,
            maxLength: 255,
        },
    },
} as const;
