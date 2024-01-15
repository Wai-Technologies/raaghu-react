/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Chat_Users_ChatTargetUserInfo = {
    properties: {
        userId: {
            type: 'string',
            format: 'uuid',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        surname: {
            type: 'string',
            isNullable: true,
        },
        username: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
