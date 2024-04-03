/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_CmsKit_Public_Polls_PollOptionDto } from './Volo_CmsKit_Public_Polls_PollOptionDto';

export type Volo_CmsKit_Public_Polls_PollWithDetailsDto = {
    id?: string;
    pollOptions?: Array<Volo_CmsKit_Public_Polls_PollOptionDto> | null;
    question?: string | null;
    code?: string | null;
    name?: string | null;
    startDate?: string;
    allowMultipleVote?: boolean;
    voteCount?: number;
    showVoteCount?: boolean;
    showResultWithoutGivingVote?: boolean;
    showHoursLeft?: boolean;
    endDate?: string | null;
    resultShowingEndDate?: string | null;
    creationTime?: string;
};

