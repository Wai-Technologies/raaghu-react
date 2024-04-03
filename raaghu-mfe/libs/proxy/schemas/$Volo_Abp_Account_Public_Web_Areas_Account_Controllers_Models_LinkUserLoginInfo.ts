/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_Public_Web_Areas_Account_Controllers_Models_LinkUserLoginInfo = {
    properties: {
        linkUserId: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        linkTenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
