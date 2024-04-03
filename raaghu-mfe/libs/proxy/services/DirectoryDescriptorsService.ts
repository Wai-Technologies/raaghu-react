/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_FileManagement_Directories_CreateDirectoryInput } from '../models/Volo_FileManagement_Directories_CreateDirectoryInput';
import type { Volo_FileManagement_Directories_DirectoryDescriptorDto } from '../models/Volo_FileManagement_Directories_DirectoryDescriptorDto';
import type { Volo_FileManagement_Directories_MoveDirectoryInput } from '../models/Volo_FileManagement_Directories_MoveDirectoryInput';
import type { Volo_FileManagement_Directories_RenameDirectoryInput } from '../models/Volo_FileManagement_Directories_RenameDirectoryInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DirectoryDescriptorsService {

    /**
     * @returns Volo_FileManagement_Directories_DirectoryDescriptorDto Success
     * @throws ApiError
     */
    public static getDirectoryDescriptor({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_FileManagement_Directories_DirectoryDescriptorDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/directory-descriptor/{id}',
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
     * @returns Volo_FileManagement_Directories_DirectoryDescriptorDto Success
     * @throws ApiError
     */
    public static postDirectoryDescriptor({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_FileManagement_Directories_RenameDirectoryInput,
    }): CancelablePromise<Volo_FileManagement_Directories_DirectoryDescriptorDto> {
        
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file-management/directory-descriptor/{id}',
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

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static deleteDirectoryDescriptor({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/file-management/directory-descriptor/{id}',
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
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getDirectoryDescriptorSubDirectories({
        parentId,
    }: {
        parentId?: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/directory-descriptor/sub-directories',
            query: {
                'parentId': parentId,
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
     * @returns Volo_FileManagement_Directories_DirectoryDescriptorDto Success
     * @throws ApiError
     */
    public static postDirectoryDescriptor1({
        requestBody,
    }: {
        requestBody?: Volo_FileManagement_Directories_CreateDirectoryInput,
    }): CancelablePromise<Volo_FileManagement_Directories_DirectoryDescriptorDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file-management/directory-descriptor',
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
    public static getDirectoryDescriptor1({
        filter,
        id,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        id?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file-management/directory-descriptor',
            query: {
                'Filter': filter,
                'Id': id,
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
     * @returns Volo_FileManagement_Directories_DirectoryDescriptorDto Success
     * @throws ApiError
     */
    public static postDirectoryDescriptorMove({
        requestBody,
    }: {
        requestBody?: Volo_FileManagement_Directories_MoveDirectoryInput,
    }): CancelablePromise<Volo_FileManagement_Directories_DirectoryDescriptorDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file-management/directory-descriptor/move',
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
