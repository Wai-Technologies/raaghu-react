/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Forms_Forms_FormDto = {
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
        title: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        canEditResponse: {
            type: 'boolean',
        },
        isCollectingEmail: {
            type: 'boolean',
        },
        requiresLogin: {
            type: 'boolean',
        },
        hasLimitOneResponsePerUser: {
            type: 'boolean',
        },
        isAcceptingResponses: {
            type: 'boolean',
        },
        isQuiz: {
            type: 'boolean',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
