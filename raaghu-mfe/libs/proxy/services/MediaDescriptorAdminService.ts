/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Admin_MediaDescriptors_MediaDescriptorDto } from '../models/Volo_CmsKit_Admin_MediaDescriptors_MediaDescriptorDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MediaDescriptorAdminService {

    /**
     * @returns Volo_CmsKit_Admin_MediaDescriptors_MediaDescriptorDto Success
     * @throws ApiError
     */
    public static postMedia({
        entityType,
        name,
        formData,
    }: {
        entityType: string,
        name: string,
        formData?: {
            File?: Blob;
        },
    }): CancelablePromise<Volo_CmsKit_Admin_MediaDescriptors_MediaDescriptorDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/media/{entityType}',
            path: {
                'entityType': entityType,
            },
            query: {
                'Name': name,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
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
    public static deleteMedia({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-admin/media/{id}',
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
