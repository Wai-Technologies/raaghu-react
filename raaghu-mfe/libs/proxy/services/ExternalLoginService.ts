/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ExternalLoginService {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postExternalLogin(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/identity/external-login',
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
