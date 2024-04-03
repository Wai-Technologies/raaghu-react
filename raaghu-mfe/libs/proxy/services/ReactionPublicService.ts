/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReactionPublicService {

    /**
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getReactions({
        entityType,
        entityId,
    }: {
        entityType: string,
        entityId: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/reactions/{entityType}/{entityId}',
            path: {
                'entityType': entityType,
                'entityId': entityId,
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
    public static putReactions({
        entityType,
        entityId,
        reaction,
    }: {
        entityType: string,
        entityId: string,
        reaction: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-public/reactions/{entityType}/{entityId}/{reaction}',
            path: {
                'entityType': entityType,
                'entityId': entityId,
                'reaction': reaction,
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
    public static deleteReactions({
        entityType,
        entityId,
        reaction,
    }: {
        entityType: string,
        entityId: string,
        reaction: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-public/reactions/{entityType}/{entityId}/{reaction}',
            path: {
                'entityType': entityType,
                'entityId': entityId,
                'reaction': reaction,
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
