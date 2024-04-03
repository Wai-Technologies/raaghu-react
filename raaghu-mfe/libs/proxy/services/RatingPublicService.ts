/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Public_Ratings_CreateUpdateRatingInput } from '../models/Volo_CmsKit_Public_Ratings_CreateUpdateRatingInput';
import type { Volo_CmsKit_Public_Ratings_RatingDto } from '../models/Volo_CmsKit_Public_Ratings_RatingDto';
import type { Volo_CmsKit_Public_Ratings_RatingWithStarCountDto } from '../models/Volo_CmsKit_Public_Ratings_RatingWithStarCountDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RatingPublicService {

    /**
     * @returns Volo_CmsKit_Public_Ratings_RatingDto Success
     * @throws ApiError
     */
    public static putRatings({
        entityType,
        entityId,
        requestBody,
    }: {
        entityType: string,
        entityId: string,
        requestBody?: Volo_CmsKit_Public_Ratings_CreateUpdateRatingInput,
    }): CancelablePromise<Volo_CmsKit_Public_Ratings_RatingDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-public/ratings/{entityType}/{entityId}',
            path: {
                'entityType': entityType,
                'entityId': entityId,
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteRatings({
        entityType,
        entityId,
    }: {
        entityType: string,
        entityId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-public/ratings/{entityType}/{entityId}',
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
     * @returns Volo_CmsKit_Public_Ratings_RatingWithStarCountDto Success
     * @throws ApiError
     */
    public static getRatings({
        entityType,
        entityId,
    }: {
        entityType: string,
        entityId: string,
    }): CancelablePromise<Array<Volo_CmsKit_Public_Ratings_RatingWithStarCountDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/ratings/{entityType}/{entityId}',
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

}
