/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Forms_Questions_CreateQuestionDto = {
    properties: {
        index: {
            type: 'number',
            isRequired: true,
            format: 'int32',
        },
        title: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        isRequired: {
            type: 'boolean',
        },
        hasOtherOption: {
            type: 'boolean',
        },
        questionType: {
            type: 'Volo_Forms_QuestionTypes',
            isRequired: true,
        },
        choices: {
            type: 'array',
            contains: {
                type: 'Volo_Forms_Choices_ChoiceDto',
            },
            isNullable: true,
        },
    },
} as const;
