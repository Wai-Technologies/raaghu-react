/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_OrganizationUnitCreateDto = {
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
            maxLength: 128,
        },
        parentId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
