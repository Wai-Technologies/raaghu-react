/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Payment_Gateways_GatewayDto } from '../models/Volo_Payment_Gateways_GatewayDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GatewayService {

    /**
     * @returns Volo_Payment_Gateways_GatewayDto Success
     * @throws ApiError
     */
    public static getGateways(): CancelablePromise<Array<Volo_Payment_Gateways_GatewayDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment/gateways',
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
     * @returns Volo_Payment_Gateways_GatewayDto Success
     * @throws ApiError
     */
    public static getGatewaysSubscriptionSupported(): CancelablePromise<Array<Volo_Payment_Gateways_GatewayDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment/gateways/subscription-supported',
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
