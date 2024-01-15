/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Forms_Forms_CreateFormDto = {
    properties: {
        title: {
            type: 'string',
            isRequired: true,
            maxLength: 128,
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 512,
        },
    },
} as const;
