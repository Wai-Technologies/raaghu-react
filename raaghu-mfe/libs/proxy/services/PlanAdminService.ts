/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Payment_Admin_Plans_GatewayPlanCreateInput } from '../models/Volo_Payment_Admin_Plans_GatewayPlanCreateInput';
import type { Volo_Payment_Admin_Plans_GatewayPlanUpdateInput } from '../models/Volo_Payment_Admin_Plans_GatewayPlanUpdateInput';
import type { Volo_Payment_Admin_Plans_PlanCreateInput } from '../models/Volo_Payment_Admin_Plans_PlanCreateInput';
import type { Volo_Payment_Admin_Plans_PlanUpdateInput } from '../models/Volo_Payment_Admin_Plans_PlanUpdateInput';
import type { Volo_Payment_Plans_PlanDto } from '../models/Volo_Payment_Plans_PlanDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PlanAdminService {

    /**
     * @returns Volo_Payment_Plans_PlanDto Success
     * @throws ApiError
     */
    public static postPlans({
        requestBody,
    }: {
        requestBody?: Volo_Payment_Admin_Plans_PlanCreateInput,
    }): CancelablePromise<Volo_Payment_Plans_PlanDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payment-admin/plans',
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
    public static deletePlans({
        id,
    }: {
        id?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/payment-admin/plans',
            query: {
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getPlans({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment-admin/plans',
            query: {
                'Filter': filter,
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
     * @returns any Success
     * @throws ApiError
     */
    public static postPlansExternalPlans({
        planId,
        requestBody,
    }: {
        planId: string,
        requestBody?: Volo_Payment_Admin_Plans_GatewayPlanCreateInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payment-admin/plans/{planId}/external-plans',
            path: {
                'planId': planId,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getPlansExternalPlans({
        planId,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        planId: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment-admin/plans/{planId}/external-plans',
            path: {
                'planId': planId,
            },
            query: {
                'Filter': filter,
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
     * @returns any Success
     * @throws ApiError
     */
    public static deletePlansExternalPlans({
        planId,
        gateway,
    }: {
        planId: string,
        gateway: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/payment-admin/plans/{planId}/external-plans/{gateway}',
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
     * @returns any Success
     * @throws ApiError
     */
    public static putPlansExternalPlans({
        planId,
        gateway,
        requestBody,
    }: {
        planId: string,
        gateway: string,
        requestBody?: Volo_Payment_Admin_Plans_GatewayPlanUpdateInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/payment-admin/plans/{planId}/external-plans/{gateway}',
            path: {
                'planId': planId,
                'gateway': gateway,
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
     * @returns Volo_Payment_Plans_PlanDto Success
     * @throws ApiError
     */
    public static getPlans1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Payment_Plans_PlanDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payment-admin/plans/{id}',
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
     * @returns Volo_Payment_Plans_PlanDto Success
     * @throws ApiError
     */
    public static putPlans({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Payment_Admin_Plans_PlanUpdateInput,
    }): CancelablePromise<Volo_Payment_Plans_PlanDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/payment-admin/plans/{id}',
            path: {
                'id': id,
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
