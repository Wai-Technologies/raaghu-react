/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Blogging_Files_FileUploadOutputDto } from '../models/Volo_Blogging_Files_FileUploadOutputDto';
import type { Volo_Blogging_Files_RawFileDto } from '../models/Volo_Blogging_Files_RawFileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlogFilesService {

    /**
     * @returns Volo_Blogging_Files_RawFileDto Success
     * @throws ApiError
     */
    public static getFiles({
        name,
    }: {
        name: string,
    }): CancelablePromise<Volo_Blogging_Files_RawFileDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/files/{name}',
            path: {
                'name': name,
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
     * @returns binary Success
     * @throws ApiError
     */
    public static getFilesWww({
        name,
    }: {
        name: string,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/blogging/files/www/{name}',
            path: {
                'name': name,
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
     * @returns Volo_Blogging_Files_FileUploadOutputDto Success
     * @throws ApiError
     */
    public static postFilesImagesUpload({
        name,
        formData,
    }: {
        name: string,
        formData?: {
            File: Blob;
        },
    }): CancelablePromise<Volo_Blogging_Files_FileUploadOutputDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/blogging/files/images/upload',
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

}
