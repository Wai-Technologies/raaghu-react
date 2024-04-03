/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Blogs_BlogFeatureDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        featureName: {
            type: 'string',
            isNullable: true,
        },
        isEnabled: {
            type: 'boolean',
        },
    },
} as const;
