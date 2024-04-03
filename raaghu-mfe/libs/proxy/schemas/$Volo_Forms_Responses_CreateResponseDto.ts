/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Forms_Responses_CreateResponseDto = {
    properties: {
        email: {
            type: 'string',
            isNullable: true,
        },
        answers: {
            type: 'array',
            contains: {
                type: 'Volo_Forms_Answers_CreateAnswerDto',
            },
            isNullable: true,
        },
    },
} as const;
