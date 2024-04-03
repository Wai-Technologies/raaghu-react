/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Polls_PollOptionDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        text: {
            type: 'string',
            isNullable: true,
        },
        order: {
            type: 'number',
            format: 'int32',
        },
        voteCount: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
