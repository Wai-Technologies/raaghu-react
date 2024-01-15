/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Chat_Messages_ChatMessageSide } from './Volo_Chat_Messages_ChatMessageSide';

export type Volo_Chat_Messages_ChatMessageDto = {
    id?: string;
    message?: string | null;
    messageDate?: string;
    isRead?: boolean;
    readDate?: string;
    side?: Volo_Chat_Messages_ChatMessageSide;
};

