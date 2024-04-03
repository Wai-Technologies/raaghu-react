/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Forms_Forms_CreateFormDto } from '../models/Volo_Forms_Forms_CreateFormDto';
import type { Volo_Forms_Forms_FormDto } from '../models/Volo_Forms_Forms_FormDto';
import type { Volo_Forms_Forms_FormInviteEmailInputDto } from '../models/Volo_Forms_Forms_FormInviteEmailInputDto';
import type { Volo_Forms_Forms_FormSettingsDto } from '../models/Volo_Forms_Forms_FormSettingsDto';
import type { Volo_Forms_Forms_FormWithDetailsDto } from '../models/Volo_Forms_Forms_FormWithDetailsDto';
import type { Volo_Forms_Forms_UpdateFormDto } from '../models/Volo_Forms_Forms_UpdateFormDto';
import type { Volo_Forms_Forms_UpdateFormSettingInputDto } from '../models/Volo_Forms_Forms_UpdateFormSettingInputDto';
import type { Volo_Forms_Questions_CreateQuestionDto } from '../models/Volo_Forms_Questions_CreateQuestionDto';
import type { Volo_Forms_Questions_GetQuestionListDto } from '../models/Volo_Forms_Questions_GetQuestionListDto';
import type { Volo_Forms_Questions_QuestionDto } from '../models/Volo_Forms_Questions_QuestionDto';
import type { Volo_Forms_Questions_UpdateQuestionDto } from '../models/Volo_Forms_Questions_UpdateQuestionDto';
import type { Volo_Forms_Responses_CreateResponseDto } from '../models/Volo_Forms_Responses_CreateResponseDto';
import type { Volo_Forms_Responses_FormResponseDto } from '../models/Volo_Forms_Responses_FormResponseDto';
import type { Volo_Forms_Responses_QuestionWithAnswersDto } from '../models/Volo_Forms_Responses_QuestionWithAnswersDto';
import type { Volo_Forms_Responses_UpdateResponseDto } from '../models/Volo_Forms_Responses_UpdateResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FormService {

    /**
     * @returns Volo_Forms_Responses_FormResponseDto Success
     * @throws ApiError
     */
    public static get({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Forms_Responses_FormResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/responses/{id}',
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
     * @returns Volo_Forms_Responses_FormResponseDto Success
     * @throws ApiError
     */
    public static post({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Forms_Responses_UpdateResponseDto,
    }): CancelablePromise<Volo_Forms_Responses_FormResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/responses/{id}',
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
    public static delete({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/responses/{id}',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static get1({
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
            url: '/api/responses',
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

    /**
     * @returns Volo_Forms_Responses_FormResponseDto Success
     * @throws ApiError
     */
    public static post1({
        formId,
        requestBody,
    }: {
        formId?: string,
        requestBody?: Volo_Forms_Responses_CreateResponseDto,
    }): CancelablePromise<Volo_Forms_Responses_FormResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/responses',
            query: {
                'formId': formId,
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
     * @returns Volo_Forms_Responses_QuestionWithAnswersDto Success
     * @throws ApiError
     */
    public static getQuestionsWithAnswers({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<Volo_Forms_Responses_QuestionWithAnswersDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/responses/{id}/questions-with-answers',
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
     * @returns Volo_Forms_Forms_FormDto Success
     * @throws ApiError
     */
    public static getFormDetails({
        formId,
    }: {
        formId: string,
    }): CancelablePromise<Volo_Forms_Forms_FormDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/responses/form-details/{formId}',
            path: {
                'formId': formId,
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getResponse({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/responses/{userId}/response',
            path: {
                'userId': userId,
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
     * @returns Volo_Forms_Questions_QuestionDto Success
     * @throws ApiError
     */
    public static get2({
        input,
    }: {
        input?: Volo_Forms_Questions_GetQuestionListDto,
    }): CancelablePromise<Array<Volo_Forms_Questions_QuestionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/questions',
            query: {
                'input': input,
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
     * @returns Volo_Forms_Questions_QuestionDto Success
     * @throws ApiError
     */
    public static get3({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Forms_Questions_QuestionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/questions/{id}',
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
     * @returns Volo_Forms_Questions_QuestionDto Success
     * @throws ApiError
     */
    public static put({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Forms_Questions_UpdateQuestionDto,
    }): CancelablePromise<Volo_Forms_Questions_QuestionDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/questions/{id}',
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
    public static delete1({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/questions/{id}',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static get4({
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
            url: '/api/forms',
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

    /**
     * @returns Volo_Forms_Forms_FormDto Success
     * @throws ApiError
     */
    public static post2({
        requestBody,
    }: {
        requestBody?: Volo_Forms_Forms_CreateFormDto,
    }): CancelablePromise<Volo_Forms_Forms_FormDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/forms',
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
    public static getResponses({
        id,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        id: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/forms/{id}/responses',
            path: {
                'id': id,
            },
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

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static deleteResponses({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/forms/{id}/responses',
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
     * @returns binary Success
     * @throws ApiError
     */
    public static getDownloadResponsesCsv({
        id,
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        id: string,
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/forms/{id}/download-responses-csv',
            path: {
                'id': id,
            },
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

    /**
     * @returns number Success
     * @throws ApiError
     */
    public static getResponsesCount({
        id,
    }: {
        id: string,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/forms/{id}/responses-count',
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
    public static post3({
        requestBody,
    }: {
        requestBody?: Volo_Forms_Forms_FormInviteEmailInputDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/invite',
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
     * @returns Volo_Forms_Forms_FormWithDetailsDto Success
     * @throws ApiError
     */
    public static get5({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Forms_Forms_FormWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/forms/{id}',
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
     * @returns Volo_Forms_Forms_FormDto Success
     * @throws ApiError
     */
    public static put1({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Forms_Forms_UpdateFormDto,
    }): CancelablePromise<Volo_Forms_Forms_FormDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/forms/{id}',
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
    public static delete2({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/forms/{id}',
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
    public static putSettings({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Forms_Forms_UpdateFormSettingInputDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/forms/{id}/settings',
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
     * @returns Volo_Forms_Forms_FormSettingsDto Success
     * @throws ApiError
     */
    public static getSettings({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Forms_Forms_FormSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/forms/{id}/settings',
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
     * @returns Volo_Forms_Questions_QuestionDto Success
     * @throws ApiError
     */
    public static getQuestions({
        id,
        input,
    }: {
        id: string,
        input?: Volo_Forms_Questions_GetQuestionListDto,
    }): CancelablePromise<Array<Volo_Forms_Questions_QuestionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/forms/{id}/questions',
            path: {
                'id': id,
            },
            query: {
                'input': input,
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
     * @returns Volo_Forms_Questions_QuestionDto Success
     * @throws ApiError
     */
    public static postQuestions({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Forms_Questions_CreateQuestionDto,
    }): CancelablePromise<Volo_Forms_Questions_QuestionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/forms/{id}/questions',
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

}
