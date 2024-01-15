/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto = {
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
            isNullable: true,
        },
        flagIcon: {
            type: 'string',
            isNullable: true,
        },
        isEnabled: {
            type: 'boolean',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
