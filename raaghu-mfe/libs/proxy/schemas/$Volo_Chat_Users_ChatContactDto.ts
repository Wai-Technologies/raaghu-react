/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Chat_Users_ChatContactDto = {
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
        hasChatPermission: {
            type: 'boolean',
        },
        lastMessageSide: {
            type: 'Volo_Chat_Messages_ChatMessageSide',
        },
        lastMessage: {
            type: 'string',
            isNullable: true,
        },
        lastMessageDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        unreadMessageCount: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
