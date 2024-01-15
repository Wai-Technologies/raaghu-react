/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Forms_Answers_AnswerDto } from './Volo_Forms_Answers_AnswerDto';

export type Volo_Forms_Responses_UpdateResponseDto = {
    id?: string;
    formId?: string;
    email?: string | null;
    answers?: Array<Volo_Forms_Answers_AnswerDto> | null;
};

