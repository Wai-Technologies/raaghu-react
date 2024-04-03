/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_SettingManagement_SendTestEmailInput = {
    properties: {
        senderEmailAddress: {
            type: 'string',
            isRequired: true,
        },
        targetEmailAddress: {
            type: 'string',
            isRequired: true,
        },
        subject: {
            type: 'string',
            isRequired: true,
        },
        body: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
