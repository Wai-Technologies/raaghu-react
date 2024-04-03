/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Chat_Messages_ChatMessageDto = {
    properties: {
        message: {
            type: 'string',
            isNullable: true,
        },
        messageDate: {
            type: 'string',
            format: 'date-time',
        },
        isRead: {
            type: 'boolean',
        },
        readDate: {
            type: 'string',
            format: 'date-time',
        },
        side: {
            type: 'Volo_Chat_Messages_ChatMessageSide',
        },
    },
} as const;
