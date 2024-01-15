/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Saas_Host_Dtos_EditionCreateDto = {
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
        displayName: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        planId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
