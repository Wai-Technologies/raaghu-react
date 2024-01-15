/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_PageFeedbacks_PageFeedbackDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        entityType: {
            type: 'string',
            isNullable: true,
        },
        entityId: {
            type: 'string',
            isNullable: true,
        },
        url: {
            type: 'string',
            isNullable: true,
        },
        isUseful: {
            type: 'boolean',
        },
        userNote: {
            type: 'string',
            isNullable: true,
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
