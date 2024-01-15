/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Polls_PollWithDetailsDto = {
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
        startDate: {
            type: 'string',
            format: 'date-time',
        },
        allowMultipleVote: {
            type: 'boolean',
        },
        voteCount: {
            type: 'number',
            format: 'int32',
        },
        showVoteCount: {
            type: 'boolean',
        },
        showResultWithoutGivingVote: {
            type: 'boolean',
        },
        showHoursLeft: {
            type: 'boolean',
        },
        endDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        resultShowingEndDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
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
        pollOptions: {
            type: 'array',
            contains: {
                type: 'Volo_CmsKit_Admin_Polls_PollOptionDto',
            },
            isNullable: true,
        },
    },
} as const;
