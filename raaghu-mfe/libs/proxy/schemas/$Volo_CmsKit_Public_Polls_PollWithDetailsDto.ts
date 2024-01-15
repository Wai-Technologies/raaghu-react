/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Polls_PollWithDetailsDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        pollOptions: {
            type: 'array',
            contains: {
                type: 'Volo_CmsKit_Public_Polls_PollOptionDto',
            },
            isNullable: true,
        },
        question: {
            type: 'string',
            isNullable: true,
        },
        code: {
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
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
