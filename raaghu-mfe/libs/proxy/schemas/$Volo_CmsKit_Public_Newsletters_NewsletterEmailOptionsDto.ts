/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Newsletters_NewsletterEmailOptionsDto = {
    properties: {
        privacyPolicyConfirmation: {
            type: 'string',
            isNullable: true,
        },
        widgetViewPath: {
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
        displayAdditionalPreferences: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
    },
} as const;
