/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_SettingManagement_UpdateEmailSettingsDto = {
    properties: {
        smtpHost: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        smtpPort: {
            type: 'number',
            format: 'int32',
            maximum: 65535,
            minimum: 1,
        },
        smtpUserName: {
            type: 'string',
            isNullable: true,
            maxLength: 1024,
        },
        smtpPassword: {
            type: 'string',
            isNullable: true,
            format: 'password',
            maxLength: 1024,
        },
        smtpDomain: {
            type: 'string',
            isNullable: true,
            maxLength: 1024,
        },
        smtpEnableSsl: {
            type: 'boolean',
        },
        smtpUseDefaultCredentials: {
            type: 'boolean',
        },
        defaultFromAddress: {
            type: 'string',
            isRequired: true,
            maxLength: 1024,
        },
        defaultFromDisplayName: {
            type: 'string',
            isRequired: true,
            maxLength: 1024,
        },
    },
} as const;
