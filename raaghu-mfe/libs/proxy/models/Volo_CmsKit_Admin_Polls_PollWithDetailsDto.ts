/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_CmsKit_Admin_Polls_PollOptionDto } from './Volo_CmsKit_Admin_Polls_PollOptionDto';

export type Volo_CmsKit_Admin_Polls_PollWithDetailsDto = {
    id?: string;
    question?: string | null;
    code?: string | null;
    widget?: string | null;
    name?: string | null;
    startDate?: string;
    allowMultipleVote?: boolean;
    voteCount?: number;
    showVoteCount?: boolean;
    showResultWithoutGivingVote?: boolean;
    showHoursLeft?: boolean;
    endDate?: string | null;
    resultShowingEndDate?: string | null;
    tenantId?: string | null;
    creationTime?: string;
    pollOptions?: Array<Volo_CmsKit_Admin_Polls_PollOptionDto> | null;
};

