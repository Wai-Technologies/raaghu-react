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
            minLength: 1,
        },
        subject: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
        message: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        recaptchaToken: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
