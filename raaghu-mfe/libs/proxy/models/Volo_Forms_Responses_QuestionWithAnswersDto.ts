/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Forms_Answers_AnswerDto } from './Volo_Forms_Answers_AnswerDto';
import type { Volo_Forms_Choices_ChoiceDto } from './Volo_Forms_Choices_ChoiceDto';
import type { Volo_Forms_QuestionTypes } from './Volo_Forms_QuestionTypes';

export type Volo_Forms_Responses_QuestionWithAnswersDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    isDeleted?: boolean;
    deleterId?: string | null;
    deletionTime?: string | null;
    formId?: string;
    index?: number;
    title?: string | null;
    description?: string | null;
    isRequired?: boolean;
    hasOtherOption?: boolean;
    questionType?: Volo_Forms_QuestionTypes;
    choices?: Array<Volo_Forms_Choices_ChoiceDto> | null;
    answers?: Array<Volo_Forms_Answers_AnswerDto> | null;
};

