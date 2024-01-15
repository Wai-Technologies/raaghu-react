/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_PageFeedbacks_CreatePageFeedbackInput = {
    properties: {
        url: {
            type: 'string',
            isNullable: true,
            maxLength: 1024,
        },
        isUseful: {
            type: 'boolean',
            isRequired: true,
        },
        userNote: {
            type: 'string',
            isNullable: true,
            maxLength: 1024,
        },
        entityType: {
            type: 'string',
            isRequired: true,
            maxLength: 64,
        },
        entityId: {
            type: 'string',
            isNullable: true,
            maxLength: 64,
        },
    },
} as const;
