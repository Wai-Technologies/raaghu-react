/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Chat_Settings_ChatSettingsDto = {
    properties: {
        deletingMessages: {
            type: 'Volo_Chat_Messages_ChatDeletingMessages',
        },
        messageDeletionPeriod: {
            type: 'number',
            format: 'int32',
            maximum: 2147483647,
        },
        deletingConversations: {
            type: 'Volo_Chat_Messages_ChatDeletingConversations',
        },
    },
} as const;
