/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Newsletters_UpdatePreferenceRequestInput = {
    properties: {
        emailAddress: {
            type: 'string',
            isRequired: true,
            format: 'email',
            maxLength: 256,
        },
        preferenceDetails: {
            type: 'array',
            contains: {
                type: 'Volo_CmsKit_Public_Newsletters_PreferenceDetailsDto',
            },
            isRequired: true,
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
        securityCode: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
    },
} as const;
