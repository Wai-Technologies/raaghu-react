/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_UserDelegationDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        userName: {
            type: 'string',
            isNullable: true,
        },
        startTime: {
            type: 'string',
            format: 'date-time',
        },
        endTime: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
