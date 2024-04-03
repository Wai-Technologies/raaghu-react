/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Menus_MenuItemDto } from '../models/Volo_CmsKit_Menus_MenuItemDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MenuItemPublicService {

    /**
     * @returns Volo_CmsKit_Menus_MenuItemDto Success
     * @throws ApiError
     */
    public static getMenuItems(): CancelablePromise<Array<Volo_CmsKit_Menus_MenuItemDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-public/menu-items',
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
