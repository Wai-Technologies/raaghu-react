/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Forms_Questions_QuestionDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastModifierId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        isDeleted: {
            type: 'boolean',
        },
        deleterId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deletionTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        formId: {
            type: 'string',
            format: 'uuid',
        },
        index: {
            type: 'number',
            format: 'int32',
        },
        title: {
            type: 'string',
            isNullable: true,
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
