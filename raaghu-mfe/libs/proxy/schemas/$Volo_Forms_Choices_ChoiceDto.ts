/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Forms_Choices_ChoiceDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        index: {
            type: 'number',
            format: 'int32',
        },
        isCorrect: {
            type: 'boolean',
        },
        value: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
