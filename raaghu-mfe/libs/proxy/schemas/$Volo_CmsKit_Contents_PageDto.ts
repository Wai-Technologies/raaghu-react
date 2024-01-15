/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Contents_PageDto = {
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
        id: {
            type: 'string',
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
    },
} as const;
