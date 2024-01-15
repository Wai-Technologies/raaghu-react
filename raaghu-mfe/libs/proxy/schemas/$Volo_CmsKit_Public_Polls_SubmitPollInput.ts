/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Polls_SubmitPollInput = {
    properties: {
        pollOptionIds: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
    },
} as const;
