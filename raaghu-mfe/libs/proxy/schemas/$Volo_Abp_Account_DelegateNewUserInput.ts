/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Account_DelegateNewUserInput = {
    properties: {
        targetUserId: {
            type: 'string',
            format: 'uuid',
        },
        startTime: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        endTime: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
    },
} as const;
