/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Payment_Requests_PaymentRequestCreateDto } from '../models/Volo_Payment_Requests_PaymentRequestCreateDto';
import type { Volo_Payment_Requests_PaymentRequestStartDto } from '../models/Volo_Payment_Requests_PaymentRequestStartDto';
import type { Volo_Payment_Requests_PaymentRequestStartResultDto } from '../models/Volo_Payment_Requests_PaymentRequestStartResultDto';
import type { Volo_Payment_Requests_PaymentRequestWithDetailsDto } from '../models/Volo_Payment_Requests_PaymentRequestWithDetailsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PaymentRequestService {

    /**
     * @returns Volo_Payment_Requests_PaymentRequestWithDetailsDto Success
     * @throws ApiError
     */
    public static postComplete({
        paymentMethod,
        requestBody,
    }: {
        paymentMethod: string,
        requestBody?: Record<string, string>,
    }): CancelablePromise<Volo_Payment_Requests_PaymentRequestWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payment/{paymentMethod}/complete',
            path: {
                'paymentMethod': paymentMethod,
            },
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
     * @returns Volo_Payment_Requests_PaymentRequestWithDetailsDto Success
     * @throws ApiError
     */
    public static postRequests({
        requestBody,
    }: {
        requestBody?: Volo_Payment_Requests_PaymentRequestCreateDto,
    }): CancelablePromise<Volo_Payment_Requests_PaymentRequestWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payment/requests',
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
     * @returns Volo_Payment_Requests_PaymentRequestWithDetailsDto Success
     * @throws ApiError
     */
    public static getRequests({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Payment_Requests_PaymentRequestWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment/requests/{id}',
            path: {
                'id': id,
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postWebhook({
        paymentMethod,
        payload,
        headers,
    }: {
        paymentMethod: string,
        payload?: string,
        headers?: Record<string, string>,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payment/{paymentMethod}/webhook',
            path: {
                'paymentMethod': paymentMethod,
            },
            headers: {
                'headers': headers,
            },
            query: {
                'payload': payload,
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
     * @returns Volo_Payment_Requests_PaymentRequestStartResultDto Success
     * @throws ApiError
     */
    public static postStart({
        paymentMethod,
        requestBody,
    }: {
        paymentMethod: string,
        requestBody?: Volo_Payment_Requests_PaymentRequestStartDto,
    }): CancelablePromise<Volo_Payment_Requests_PaymentRequestStartResultDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payment/{paymentMethod}/start',
            path: {
                'paymentMethod': paymentMethod,
            },
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
