/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Newsletters_NewsletterRecordWithDetailsDto = {
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
        emailAddress: {
            type: 'string',
            isNullable: true,
        },
        preferences: {
            type: 'array',
            contains: {
                type: 'Volo_CmsKit_Admin_Newsletters_NewsletterPreferenceDto',
            },
            isNullable: true,
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
