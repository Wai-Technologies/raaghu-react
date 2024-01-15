/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_SettingManagement_SendTestEmailInput = {
    properties: {
        senderEmailAddress: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        targetEmailAddress: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        subject: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        body: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
