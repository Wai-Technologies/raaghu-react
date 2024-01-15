/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Forms_Answers_CreateAnswerDto = {
    properties: {
        questionId: {
            type: 'string',
            format: 'uuid',
        },
        choiceId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        value: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
