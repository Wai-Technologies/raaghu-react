/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_LanguageManagement_Dto_LanguageDto = {
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
        id: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        cultureName: {
            type: 'string',
            isNullable: true,
        },
        uiCultureName: {
            type: 'string',
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
        isDefaultLanguage: {
            type: 'boolean',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
