/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Account_ConfirmEmailInput } from '../models/Volo_Abp_Account_ConfirmEmailInput';
import type { Volo_Abp_Account_ConfirmPhoneNumberInput } from '../models/Volo_Abp_Account_ConfirmPhoneNumberInput';
import type { Volo_Abp_Account_IdentityUserConfirmationStateDto } from '../models/Volo_Abp_Account_IdentityUserConfirmationStateDto';
import type { Volo_Abp_Account_ProfilePictureSourceDto } from '../models/Volo_Abp_Account_ProfilePictureSourceDto';
import type { Volo_Abp_Account_ProfilePictureType } from '../models/Volo_Abp_Account_ProfilePictureType';
import type { Volo_Abp_Account_RegisterDto } from '../models/Volo_Abp_Account_RegisterDto';
import type { Volo_Abp_Account_ResetPasswordDto } from '../models/Volo_Abp_Account_ResetPasswordDto';
import type { Volo_Abp_Account_SendEmailConfirmationTokenDto } from '../models/Volo_Abp_Account_SendEmailConfirmationTokenDto';
import type { Volo_Abp_Account_SendPasswordResetCodeDto } from '../models/Volo_Abp_Account_SendPasswordResetCodeDto';
import type { Volo_Abp_Account_SendPhoneNumberConfirmationTokenDto } from '../models/Volo_Abp_Account_SendPhoneNumberConfirmationTokenDto';
import type { Volo_Abp_Account_SendTwoFactorCodeInput } from '../models/Volo_Abp_Account_SendTwoFactorCodeInput';
import type { Volo_Abp_Account_VerifyEmailConfirmationTokenInput } from '../models/Volo_Abp_Account_VerifyEmailConfirmationTokenInput';
import type { Volo_Abp_Account_VerifyPasswordResetTokenInput } from '../models/Volo_Abp_Account_VerifyPasswordResetTokenInput';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_Identity_IdentityUserDto } from '../models/Volo_Abp_Identity_IdentityUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountService {

    /**
     * @returns Volo_Abp_Identity_IdentityUserDto Success
     * @throws ApiError
     */
    public static postRegister({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_RegisterDto,
    }): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/register',
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
    public static postSendPasswordResetCode({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_SendPasswordResetCodeDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/send-password-reset-code',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postVerifyPasswordResetToken({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_VerifyPasswordResetTokenInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/verify-password-reset-token',
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
    public static postResetPassword({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_ResetPasswordDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/reset-password',
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
     * @returns Volo_Abp_Account_IdentityUserConfirmationStateDto Success
     * @throws ApiError
     */
    public static getConfirmationState({
        id,
    }: {
        id?: string,
    }): CancelablePromise<Volo_Abp_Account_IdentityUserConfirmationStateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/confirmation-state',
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
     * @returns any Success
     * @throws ApiError
     */
    public static postSendPhoneNumberConfirmationToken({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_SendPhoneNumberConfirmationTokenDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/send-phone-number-confirmation-token',
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
    public static postSendEmailConfirmationToken({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_SendEmailConfirmationTokenDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/send-email-confirmation-token',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public static postVerifyEmailConfirmationToken({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_VerifyEmailConfirmationTokenInput,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/verify-email-confirmation-token',
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
    public static postConfirmPhoneNumber({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_ConfirmPhoneNumberInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/confirm-phone-number',
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
    public static postConfirmEmail({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_ConfirmEmailInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/confirm-email',
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
    public static postProfilePicture({
        type,
        formData,
    }: {
        type?: Volo_Abp_Account_ProfilePictureType,
        formData?: {
            ImageContent?: Blob;
        },
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/profile-picture',
            query: {
                'Type': type,
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
     * @returns Volo_Abp_Account_ProfilePictureSourceDto Success
     * @throws ApiError
     */
    public static getProfilePicture({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_Account_ProfilePictureSourceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/profile-picture/{id}',
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
     * @returns string Success
     * @throws ApiError
     */
    public static getTwoFactorProviders({
        userId,
        token,
    }: {
        userId: string,
        token: string,
    }): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/two-factor-providers',
            query: {
                'UserId': userId,
                'Token': token,
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
    public static postSendTwoFactorCode({
        requestBody,
    }: {
        requestBody?: Volo_Abp_Account_SendTwoFactorCodeInput,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/account/send-two-factor-code',
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
    public static getSecurityLogs({
        startTime,
        endTime,
        applicationName,
        identity,
        action,
        userName,
        clientId,
        correlationId,
        sorting,
        skipCount,
        maxResultCount,
        extraProperties,
    }: {
        startTime?: string,
        endTime?: string,
        applicationName?: string,
        identity?: string,
        action?: string,
        userName?: string,
        clientId?: string,
        correlationId?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
        extraProperties?: Record<string, any>,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/security-logs',
            query: {
                'StartTime': startTime,
                'EndTime': endTime,
                'ApplicationName': applicationName,
                'Identity': identity,
                'Action': action,
                'UserName': userName,
                'ClientId': clientId,
                'CorrelationId': correlationId,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
                'ExtraProperties': extraProperties,
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
    public static getProfilePictureFile({
        id,
    }: {
        id: string,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/profile-picture-file/{id}',
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
    public static getRecaptchaValidate({
        captchaResponse,
    }: {
        captchaResponse?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/account/recaptcha-validate',
            query: {
                'captchaResponse': captchaResponse,
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
