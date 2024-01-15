/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Forms_Answers_AnswerDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        questionId: {
            type: 'string',
            format: 'uuid',
        },
        choiceId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        formResponseId: {
            type: 'string',
            format: 'uuid',
        },
        answerDate: {
            type: 'string',
            format: 'date-time',
        },
        value: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
