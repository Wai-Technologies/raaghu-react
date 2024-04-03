/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Polls_PollDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        question: {
            type: 'string',
            isNullable: true,
        },
        code: {
            type: 'string',
            isNullable: true,
        },
        widget: {
            type: 'string',
            isNullable: true,
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        allowMultipleVote: {
            type: 'boolean',
        },
        voteCount: {
            type: 'number',
            format: 'int32',
        },
        startDate: {
            type: 'string',
            format: 'date-time',
        },
        endDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
