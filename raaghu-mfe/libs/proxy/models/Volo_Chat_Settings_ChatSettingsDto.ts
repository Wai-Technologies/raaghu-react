/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Chat_Messages_ChatDeletingConversations } from './Volo_Chat_Messages_ChatDeletingConversations';
import type { Volo_Chat_Messages_ChatDeletingMessages } from './Volo_Chat_Messages_ChatDeletingMessages';

export type Volo_Chat_Settings_ChatSettingsDto = {
    deletingMessages?: Volo_Chat_Messages_ChatDeletingMessages;
    messageDeletionPeriod?: number;
    deletingConversations?: Volo_Chat_Messages_ChatDeletingConversations;
};

