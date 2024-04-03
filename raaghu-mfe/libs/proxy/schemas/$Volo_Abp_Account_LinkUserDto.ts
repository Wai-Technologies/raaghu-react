/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_LinkUserDto = {
    properties: {
        targetUserId: {
            type: 'string',
            format: 'uuid',
        },
        targetUserName: {
            type: 'string',
            isNullable: true,
        },
        targetTenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        targetTenantName: {
            type: 'string',
            isNullable: true,
        },
        directlyLinked: {
            type: 'boolean',
        },
    },
} as const;
