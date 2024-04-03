/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Forms_Questions_QuestionDto } from './Volo_Forms_Questions_QuestionDto';

export type Volo_Forms_Forms_FormWithDetailsDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    isDeleted?: boolean;
    deleterId?: string | null;
    deletionTime?: string | null;
    title?: string | null;
    description?: string | null;
    tenantId?: string | null;
    canEditResponse?: boolean;
    isCollectingEmail?: boolean;
    hasLimitOneResponsePerUser?: boolean;
    isAcceptingResponses?: boolean;
    isQuiz?: boolean;
    requiresLogin?: boolean;
    questions?: Array<Volo_Forms_Questions_QuestionDto> | null;
};

