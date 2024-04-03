/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { System_Net_HttpStatusCode } from '../models/System_Net_HttpStatusCode';
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_Auditing_EntityChangeType } from '../models/Volo_Abp_Auditing_EntityChangeType';
import type { Volo_Abp_AuditLogging_AuditLogDto } from '../models/Volo_Abp_AuditLogging_AuditLogDto';
import type { Volo_Abp_AuditLogging_EntityChangeDto } from '../models/Volo_Abp_AuditLogging_EntityChangeDto';
import type { Volo_Abp_AuditLogging_EntityChangeWithUsernameDto } from '../models/Volo_Abp_AuditLogging_EntityChangeWithUsernameDto';
import type { Volo_Abp_AuditLogging_GetAverageExecutionDurationPerDayOutput } from '../models/Volo_Abp_AuditLogging_GetAverageExecutionDurationPerDayOutput';
import type { Volo_Abp_AuditLogging_GetErrorRateOutput } from '../models/Volo_Abp_AuditLogging_GetErrorRateOutput';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuditLogsService {

    /**
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<any> Success
     * @throws ApiError
     */
    public static getAuditLogs({
        startTime,
        endTime,
        url,
        userName,
        applicationName,
        clientIpAddress,
        correlationId,
        httpMethod,
        httpStatusCode,
        maxExecutionDuration,
        minExecutionDuration,
        hasException,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        startTime?: string,
        endTime?: string,
        url?: string,
        userName?: string,
        applicationName?: string,
        clientIpAddress?: string,
        correlationId?: string,
        httpMethod?: string,
        httpStatusCode?: System_Net_HttpStatusCode,
        maxExecutionDuration?: number,
        minExecutionDuration?: number,
        hasException?: boolean,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/audit-logs',
            query: {
                'StartTime': startTime,
                'EndTime': endTime,
                'Url': url,
                'UserName': userName,
                'ApplicationName': applicationName,
                'ClientIpAddress': clientIpAddress,
                'CorrelationId': correlationId,
                'HttpMethod': httpMethod,
                'HttpStatusCode': httpStatusCode,
                'MaxExecutionDuration': maxExecutionDuration,
                'MinExecutionDuration': minExecutionDuration,
                'HasException': hasException,
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
     * @returns Volo_Abp_AuditLogging_AuditLogDto Success
     * @throws ApiError
     */
    public static getAuditLogs1({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Abp_AuditLogging_AuditLogDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/audit-logs/{id}',
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
     * @returns Volo_Abp_AuditLogging_GetErrorRateOutput Success
     * @throws ApiError
     */
    public static getAuditLogsStatisticsErrorRate({
        startDate,
        endDate,
    }: {
        startDate?: string,
        endDate?: string,
    }): CancelablePromise<Volo_Abp_AuditLogging_GetErrorRateOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/audit-logs/statistics/error-rate',
            query: {
                'StartDate': startDate,
                'EndDate': endDate,
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
     * @returns Volo_Abp_AuditLogging_GetAverageExecutionDurationPerDayOutput Success
     * @throws ApiError
     */
    public static getAuditLogsStatisticsAverageExecutionDurationPerDay({
        startDate,
        endDate,
    }: {
        startDate?: string,
        endDate?: string,
    }): CancelablePromise<Volo_Abp_AuditLogging_GetAverageExecutionDurationPerDayOutput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/audit-logs/statistics/average-execution-duration-per-day',
            query: {
                'StartDate': startDate,
                'EndDate': endDate,
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
    public static getAuditLogsEntityChanges({
        auditLogId,
        entityChangeType,
        entityId,
        entityTypeFullName,
        startDate,
        endDate,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        auditLogId?: string,
        entityChangeType?: Volo_Abp_Auditing_EntityChangeType,
        entityId?: string,
        entityTypeFullName?: string,
        startDate?: string,
        endDate?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/audit-logs/entity-changes',
            query: {
                'AuditLogId': auditLogId,
                'EntityChangeType': entityChangeType,
                'EntityId': entityId,
                'EntityTypeFullName': entityTypeFullName,
                'StartDate': startDate,
                'EndDate': endDate,
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
     * @returns Volo_Abp_AuditLogging_EntityChangeWithUsernameDto Success
     * @throws ApiError
     */
    public static getAuditLogsEntityChangesWithUsername({
        entityId,
        entityTypeFullName,
    }: {
        entityId?: string,
        entityTypeFullName?: string,
    }): CancelablePromise<Array<Volo_Abp_AuditLogging_EntityChangeWithUsernameDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/audit-logs/entity-changes-with-username',
            query: {
                'EntityId': entityId,
                'EntityTypeFullName': entityTypeFullName,
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
     * @returns Volo_Abp_AuditLogging_EntityChangeWithUsernameDto Success
     * @throws ApiError
     */
    public static getAuditLogsEntityChangeWithUsername({
        entityChangeId,
    }: {
        entityChangeId: string,
    }): CancelablePromise<Volo_Abp_AuditLogging_EntityChangeWithUsernameDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/audit-logs/entity-change-with-username/{entityChangeId}',
            path: {
                'entityChangeId': entityChangeId,
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
     * @returns Volo_Abp_AuditLogging_EntityChangeDto Success
     * @throws ApiError
     */
    public static getAuditLogsEntityChanges1({
        entityChangeId,
    }: {
        entityChangeId: string,
    }): CancelablePromise<Volo_Abp_AuditLogging_EntityChangeDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/audit-logging/audit-logs/entity-changes/{entityChangeId}',
            path: {
                'entityChangeId': entityChangeId,
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
