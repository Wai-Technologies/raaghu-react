/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Contact_ContactCreateInput = {
    properties: {
        contactName: {
            type: 'string',
            isNullable: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        subject: {
            type: 'string',
            isRequired: true,
        },
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
        },
        message: {
            type: 'string',
            isRequired: true,
        },
        recaptchaToken: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
