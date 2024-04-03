/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Public_Contact_ContactCreateInput } from '../models/Volo_CmsKit_Public_Contact_ContactCreateInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContactPublicService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postContacts({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Public_Contact_ContactCreateInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-public/contacts',
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

}
