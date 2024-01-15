/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from '../models/Volo_Abp_Application_Dtos_ListResultDto_1';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_CmsKit_Admin_Menus_MenuItemCreateInput } from '../models/Volo_CmsKit_Admin_Menus_MenuItemCreateInput';
import type { Volo_CmsKit_Admin_Menus_MenuItemMoveInput } from '../models/Volo_CmsKit_Admin_Menus_MenuItemMoveInput';
import type { Volo_CmsKit_Admin_Menus_MenuItemUpdateInput } from '../models/Volo_CmsKit_Admin_Menus_MenuItemUpdateInput';
import type { Volo_CmsKit_Menus_MenuItemDto } from '../models/Volo_CmsKit_Menus_MenuItemDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MenuItemAdminService {

    /**
     * @returns Volo_Abp_Application_Dtos_ListResultDto_1<any> Success
     * @throws ApiError
     */
    public static getMenuItems(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/menu-items',
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
     * @returns Volo_CmsKit_Menus_MenuItemDto Success
     * @throws ApiError
     */
    public static postMenuItems({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_Menus_MenuItemCreateInput,
    }): CancelablePromise<Volo_CmsKit_Menus_MenuItemDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/menu-items',
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
     * @returns Volo_CmsKit_Menus_MenuItemDto Success
     * @throws ApiError
     */
    public static getMenuItems1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_CmsKit_Menus_MenuItemDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/menu-items/{id}',
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
     * @returns Volo_CmsKit_Menus_MenuItemDto Success
     * @throws ApiError
     */
    public static putMenuItems({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_CmsKit_Admin_Menus_MenuItemUpdateInput,
    }): CancelablePromise<Volo_CmsKit_Menus_MenuItemDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/menu-items/{id}',
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
    public static deleteMenuItems({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cms-kit-admin/menu-items/{id}',
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
     * @returns any Success
     * @throws ApiError
     */
    public static putMenuItemsMove({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_CmsKit_Admin_Menus_MenuItemMoveInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/cms-kit-admin/menu-items/{id}/move',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getMenuItemsLookupPages({
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
            url: '/api/cms-kit-admin/menu-items/lookup/pages',
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

}
