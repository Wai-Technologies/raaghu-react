/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Newsletters_CreateNewsletterRecordInput = {
    properties: {
        emailAddress: {
            type: 'string',
            isRequired: true,
            format: 'email',
            maxLength: 256,
        },
        preference: {
            type: 'string',
            isRequired: true,
            maxLength: 128,
        },
        source: {
            type: 'string',
            isRequired: true,
            maxLength: 64,
        },
        sourceUrl: {
            type: 'string',
            isRequired: true,
            maxLength: 256,
        },
        privacyPolicyUrl: {
            type: 'string',
            isNullable: true,
        },
        additionalPreferences: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
    },
} as const;
