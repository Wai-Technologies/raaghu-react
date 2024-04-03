/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Blogging_Tagging_Dtos_TagDto = {
    properties: {
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
        isDeleted: {
            type: 'boolean',
        },
        deleterId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deletionTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        usageCount: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
