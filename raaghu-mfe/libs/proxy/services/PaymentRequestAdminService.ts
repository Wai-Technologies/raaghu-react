/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Payment_Requests_PaymentRequestState } from '../models/Volo_Payment_Requests_PaymentRequestState';
import type { Volo_Payment_Requests_PaymentRequestWithDetailsDto } from '../models/Volo_Payment_Requests_PaymentRequestWithDetailsDto';
import type { Volo_Payment_Requests_PaymentType } from '../models/Volo_Payment_Requests_PaymentType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PaymentRequestAdminService {

    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getPaymentRequests({
        filter,
        creationDateMax,
        creationDateMin,
        paymentType,
        status,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        creationDateMax?: string,
        creationDateMin?: string,
        paymentType?: Volo_Payment_Requests_PaymentType,
        status?: Volo_Payment_Requests_PaymentRequestState,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment-admin/payment-requests',
            query: {
                'Filter': filter,
                'CreationDateMax': creationDateMax,
                'CreationDateMin': creationDateMin,
                'PaymentType': paymentType,
                'Status': status,
                'Sorting': sorting,
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
     * @returns Volo_Payment_Requests_PaymentRequestWithDetailsDto Success
     * @throws ApiError
     */
    public static getPaymentRequests1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Payment_Requests_PaymentRequestWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment-admin/payment-requests/{id}',
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

}
