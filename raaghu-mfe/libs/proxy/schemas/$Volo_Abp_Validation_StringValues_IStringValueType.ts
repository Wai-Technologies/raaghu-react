/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Validation_StringValues_IStringValueType = {
    properties: {
        name: {
            type: 'string',
            isReadOnly: true,
            isNullable: true,
        },
        properties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
                isNullable: true,
            },
            isReadOnly: true,
            isNullable: true,
        },
        validator: {
            type: 'Volo_Abp_Validation_StringValues_IValueValidator',
        },
    },
} as const;
