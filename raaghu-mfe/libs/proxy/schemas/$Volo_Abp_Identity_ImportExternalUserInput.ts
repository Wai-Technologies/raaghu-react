/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_ImportExternalUserInput = {
    properties: {
        provider: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        userNameOrEmailAddress: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        password: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
