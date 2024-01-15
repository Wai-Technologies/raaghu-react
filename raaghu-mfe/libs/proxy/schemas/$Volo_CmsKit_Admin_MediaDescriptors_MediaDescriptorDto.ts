/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_MediaDescriptors_MediaDescriptorDto = {
    properties: {
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isReadOnly: true,
            isNullable: true,
        },
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
