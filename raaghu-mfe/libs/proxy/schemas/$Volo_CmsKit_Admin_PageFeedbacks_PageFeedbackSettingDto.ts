/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_PageFeedbacks_PageFeedbackSettingDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        entityType: {
            type: 'string',
            isNullable: true,
        },
        emailAddresses: {
            type: 'string',
            isNullable: true,
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
