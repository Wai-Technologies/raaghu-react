/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_SettingManagement_EmailSettingsDto = {
    properties: {
        smtpHost: {
            type: 'string',
            isNullable: true,
        },
        smtpPort: {
            type: 'number',
            format: 'int32',
        },
        smtpUserName: {
            type: 'string',
            isNullable: true,
        },
        smtpPassword: {
            type: 'string',
            isNullable: true,
        },
        smtpDomain: {
            type: 'string',
            isNullable: true,
        },
        smtpEnableSsl: {
            type: 'boolean',
        },
        smtpUseDefaultCredentials: {
            type: 'boolean',
        },
        defaultFromAddress: {
            type: 'string',
            isNullable: true,
        },
        defaultFromDisplayName: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
