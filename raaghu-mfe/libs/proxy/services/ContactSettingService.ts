/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_CmsKit_Admin_Contact_CmsKitContactSettingDto } from '../models/Volo_CmsKit_Admin_Contact_CmsKitContactSettingDto';
import type { Volo_CmsKit_Admin_Contact_UpdateCmsKitContactSettingDto } from '../models/Volo_CmsKit_Admin_Contact_UpdateCmsKitContactSettingDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContactSettingService {

    /**
     * @returns Volo_CmsKit_Admin_Contact_CmsKitContactSettingDto Success
     * @throws ApiError
     */
    public static getContactSettings(): CancelablePromise<Volo_CmsKit_Admin_Contact_CmsKitContactSettingDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cms-kit-admin/contact/settings',
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
    public static postContactSettings({
        requestBody,
    }: {
        requestBody?: Volo_CmsKit_Admin_Contact_UpdateCmsKitContactSettingDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cms-kit-admin/contact/settings',
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
