/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_CmsKit_Admin_Polls_PollOptionDto } from './Volo_CmsKit_Admin_Polls_PollOptionDto';

export type Volo_CmsKit_Admin_Polls_UpdatePollDto = {
    question: string;
    code: string;
    widget?: string | null;
    name?: string | null;
    showVoteCount?: boolean;
    showResultWithoutGivingVote?: boolean;
    showHoursLeft?: boolean;
    startDate?: string;
    endDate?: string | null;
    resultShowingEndDate?: string | null;
    pollOptions?: Array<Volo_CmsKit_Admin_Polls_PollOptionDto> | null;
};

