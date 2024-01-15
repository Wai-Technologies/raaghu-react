/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_FileManagement_Directories_DirectoryDescriptorInfoDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        parentId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        hasChildren: {
            type: 'boolean',
        },
    },
} as const;
