/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Polls_GetResultDto = {
    properties: {
        question: {
            type: 'string',
            isNullable: true,
        },
        pollVoteCount: {
            type: 'number',
            format: 'int32',
        },
        pollResultDetails: {
            type: 'array',
            contains: {
                type: 'Volo_CmsKit_Public_Polls_PollResultDto',
            },
            isNullable: true,
        },
    },
} as const;
