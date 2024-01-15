/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_ImportUsersFromFileOutput = {
    properties: {
        allCount: {
            type: 'number',
            format: 'int32',
        },
        succeededCount: {
            type: 'number',
            format: 'int32',
        },
        failedCount: {
            type: 'number',
            format: 'int32',
        },
        invalidUsersDownloadToken: {
            type: 'string',
            isNullable: true,
        },
        isAllSucceeded: {
            type: 'boolean',
            isReadOnly: true,
        },
    },
} as const;
