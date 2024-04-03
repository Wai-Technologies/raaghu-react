/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Forms_Responses_FormResponseDto = {
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
        userId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        formId: {
            type: 'string',
            format: 'uuid',
        },
        email: {
            type: 'string',
            isNullable: true,
        },
        answers: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
    },
} as const;
