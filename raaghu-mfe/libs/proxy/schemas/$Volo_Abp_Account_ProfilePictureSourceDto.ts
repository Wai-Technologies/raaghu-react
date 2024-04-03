/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_ProfilePictureSourceDto = {
    properties: {
        type: {
            type: 'Volo_Abp_Account_ProfilePictureType',
        },
        source: {
            type: 'string',
            isNullable: true,
        },
        fileContent: {
            type: 'string',
            isNullable: true,
            format: 'byte',
        },
    },
} as const;
