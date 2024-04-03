/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_UrlShorting_ShortenedUrlDto = {
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
        source: {
            type: 'string',
            isNullable: true,
        },
        target: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
