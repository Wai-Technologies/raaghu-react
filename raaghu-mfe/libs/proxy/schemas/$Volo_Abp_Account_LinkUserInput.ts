/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_LinkUserInput = {
    properties: {
        userId: {
            type: 'string',
            format: 'uuid',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        token: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
    },
} as const;
