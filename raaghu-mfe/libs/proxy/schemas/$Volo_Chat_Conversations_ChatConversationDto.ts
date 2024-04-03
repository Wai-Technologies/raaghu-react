/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Chat_Conversations_ChatConversationDto = {
    properties: {
        messages: {
            type: 'array',
            contains: {
                type: 'Volo_Chat_Messages_ChatMessageDto',
            },
            isNullable: true,
        },
        targetUserInfo: {
            type: 'Volo_Chat_Users_ChatTargetUserInfo',
        },
    },
} as const;
