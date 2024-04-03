/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_UrlShorting_CreateShortenedUrlDto = {
    properties: {
        source: {
            type: 'string',
            isRequired: true,
            maxLength: 512,
        },
        target: {
            type: 'string',
            isRequired: true,
            maxLength: 2048,
        },
    },
} as const;
