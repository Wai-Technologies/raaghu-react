/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Users_CmsUserDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        tenantId: {
            type: 'string',
            isReadOnly: true,
            isNullable: true,
            format: 'uuid',
        },
        userName: {
            type: 'string',
            isReadOnly: true,
            isNullable: true,
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        surname: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
