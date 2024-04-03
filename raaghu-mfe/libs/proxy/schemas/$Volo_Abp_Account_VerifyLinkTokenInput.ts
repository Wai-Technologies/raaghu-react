/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_VerifyLinkTokenInput = {
    properties: {
        userId: {
            type: 'string',
            isRequired: true,
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
        },
    },
} as const;
