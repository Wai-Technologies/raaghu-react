/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_MediaDescriptors_MediaDescriptorDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        mimeType: {
            type: 'string',
            isNullable: true,
        },
        size: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
