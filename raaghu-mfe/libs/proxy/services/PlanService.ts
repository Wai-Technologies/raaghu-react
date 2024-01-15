/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Payment_Plans_GatewayPlanDto } from '../models/Volo_Payment_Plans_GatewayPlanDto';
import type { Volo_Payment_Plans_PlanDto } from '../models/Volo_Payment_Plans_PlanDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PlanService {

    /**
     * @returns Volo_Payment_Plans_GatewayPlanDto Success
     * @throws ApiError
     */
    public static getPlans({
        planId,
        gateway,
    }: {
        planId: string,
        gateway: string,
    }): CancelablePromise<Volo_Payment_Plans_GatewayPlanDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment/plans/{planId}/{gateway}',
            path: {
                'planId': planId,
                'gateway': gateway,
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
     * @returns Volo_Payment_Plans_PlanDto Success
     * @throws ApiError
     */
    public static getPlans1(): CancelablePromise<Array<Volo_Payment_Plans_PlanDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment/plans',
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
     * @returns Volo_Payment_Plans_PlanDto Success
     * @throws ApiError
     */
    public static getPlans2({
        planId,
    }: {
        planId: string,
    }): CancelablePromise<Volo_Payment_Plans_PlanDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment/plans/{planId}',
            path: {
                'planId': planId,
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
     * @returns Volo_Payment_Plans_PlanDto Success
     * @throws ApiError
     */
    public static getPlansMany({
        ids,
    }: {
        ids?: Array<string>,
    }): CancelablePromise<Array<Volo_Payment_Plans_PlanDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment/plans/many',
            query: {
                'ids': ids,
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
