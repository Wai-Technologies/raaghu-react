/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Chat_Users_ChatContactDto } from '../models/Volo_Chat_Users_ChatContactDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContactService {

    /**
     * @returns Volo_Chat_Users_ChatContactDto Success
     * @throws ApiError
     */
    public static getContactContacts({
        filter,
        includeOtherContacts,
    }: {
        filter?: string,
        includeOtherContacts?: boolean,
    }): CancelablePromise<Array<Volo_Chat_Users_ChatContactDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/contact/contacts',
            query: {
                'Filter': filter,
                'IncludeOtherContacts': includeOtherContacts,
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
     * @returns number Success
     * @throws ApiError
     */
    public static getContactTotalUnreadMessageCount(): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/contact/total-unread-message-count',
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
