/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Chat_Conversations_ChatConversationDto } from '../models/Volo_Chat_Conversations_ChatConversationDto';
import type { Volo_Chat_Conversations_MarkConversationAsReadInput } from '../models/Volo_Chat_Conversations_MarkConversationAsReadInput';
import type { Volo_Chat_Messages_ChatMessageDto } from '../models/Volo_Chat_Messages_ChatMessageDto';
import type { Volo_Chat_Messages_SendMessageInput } from '../models/Volo_Chat_Messages_SendMessageInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConversationService {

    /**
     * @returns Volo_Chat_Messages_ChatMessageDto Success
     * @throws ApiError
     */
    public static postConversationSendMessage({
        requestBody,
    }: {
        requestBody?: Volo_Chat_Messages_SendMessageInput,
    }): CancelablePromise<Volo_Chat_Messages_ChatMessageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/conversation/send-message',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static deleteConversationDeleteMessage({
        targetUserId,
        messageId,
    }: {
        targetUserId?: string,
        messageId?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/chat/conversation/delete-message',
            query: {
                'TargetUserId': targetUserId,
                'MessageId': messageId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @returns Volo_Chat_Conversations_ChatConversationDto Success
     * @throws ApiError
     */
    public static getConversationConversation({
        targetUserId,
        skipCount,
        maxResultCount,
    }: {
        targetUserId?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Chat_Conversations_ChatConversationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/conversation/conversation',
            query: {
                'TargetUserId': targetUserId,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postConversationMarkConversationAsRead({
        requestBody,
    }: {
        requestBody?: Volo_Chat_Conversations_MarkConversationAsReadInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/conversation/mark-conversation-as-read',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static deleteConversationDeleteConversation({
        targetUserId,
    }: {
        targetUserId?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/chat/conversation/delete-conversation',
            query: {
                'TargetUserId': targetUserId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

}
