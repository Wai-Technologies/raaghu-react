/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Forms_Responses_UpdateResponseDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        formId: {
            type: 'string',
            format: 'uuid',
        },
        email: {
            type: 'string',
            isNullable: true,
        },
        answers: {
            type: 'array',
            contains: {
                type: 'Volo_Forms_Answers_AnswerDto',
            },
            isNullable: true,
        },
    },
} as const;
