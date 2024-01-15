/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Polls_PollResultDto = {
    properties: {
        isSelectedForCurrentUser: {
            type: 'boolean',
        },
        text: {
            type: 'string',
            isNullable: true,
        },
        voteCount: {
            type: 'number',
            format: 'int32',
        },
    },
} as const;
