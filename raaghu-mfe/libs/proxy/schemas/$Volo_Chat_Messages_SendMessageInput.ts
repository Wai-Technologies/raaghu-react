/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Chat_Messages_SendMessageInput = {
    properties: {
        targetUserId: {
            type: 'string',
            format: 'uuid',
        },
        message: {
            type: 'string',
            isRequired: true,
            maxLength: 4096,
            minLength: 1,
        },
    },
} as const;
