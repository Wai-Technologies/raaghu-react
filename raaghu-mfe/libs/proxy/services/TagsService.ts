/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Blogging_Tagging_Dtos_TagDto } from '../models/Volo_Blogging_Tagging_Dtos_TagDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TagsService {

    /**
     * @returns Volo_Blogging_Tagging_Dtos_TagDto Success
     * @throws ApiError
     */
    public static getTagsPopular({
        blogId,
        resultCount,
        minimumPostCount,
    }: {
        blogId: string,
        resultCount?: number,
        minimumPostCount?: number,
    }): CancelablePromise<Array<Volo_Blogging_Tagging_Dtos_TagDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/tags/popular/{blogId}',
            path: {
                'blogId': blogId,
            },
            query: {
                'ResultCount': resultCount,
                'MinimumPostCount': minimumPostCount,
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
