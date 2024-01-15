/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Forms_Answers_AnswerDto } from './Volo_Forms_Answers_AnswerDto';

export type Volo_Forms_Responses_FormResponseDetailedDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    isDeleted?: boolean;
    deleterId?: string | null;
    deletionTime?: string | null;
    userId?: string | null;
    formId?: string;
    email?: string | null;
    answers?: Array<Volo_Forms_Answers_AnswerDto> | null;
};

