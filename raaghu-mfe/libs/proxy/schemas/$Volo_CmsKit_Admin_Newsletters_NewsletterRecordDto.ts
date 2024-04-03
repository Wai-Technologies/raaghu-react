/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Newsletters_NewsletterRecordDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        emailAddress: {
            type: 'string',
            isNullable: true,
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
