/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Pages_PageDto = {
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
        title: {
            type: 'string',
            isNullable: true,
        },
        slug: {
            type: 'string',
            isNullable: true,
        },
        content: {
            type: 'string',
            isNullable: true,
        },
        script: {
            type: 'string',
            isNullable: true,
        },
        style: {
            type: 'string',
            isNullable: true,
        },
        isHomePage: {
            type: 'boolean',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
