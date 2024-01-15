/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_PageFeedbacks_UpdatePageFeedbackSettingDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        entityType: {
            type: 'string',
            isNullable: true,
            maxLength: 64,
        },
        emailAddresses: {
            type: 'string',
            isNullable: true,
            maxLength: 1024,
        },
    },
} as const;
