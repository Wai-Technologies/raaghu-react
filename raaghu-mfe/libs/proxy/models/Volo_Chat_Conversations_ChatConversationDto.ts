/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Chat_Messages_ChatMessageDto } from './Volo_Chat_Messages_ChatMessageDto';
import type { Volo_Chat_Users_ChatTargetUserInfo } from './Volo_Chat_Users_ChatTargetUserInfo';

export type Volo_Chat_Conversations_ChatConversationDto = {
    messages?: Array<Volo_Chat_Messages_ChatMessageDto> | null;
    targetUserInfo?: Volo_Chat_Users_ChatTargetUserInfo;
};

