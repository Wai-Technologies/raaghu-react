/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_CmsKit_Public_Polls_PollResultDto } from './Volo_CmsKit_Public_Polls_PollResultDto';

export type Volo_CmsKit_Public_Polls_GetResultDto = {
    question?: string | null;
    pollVoteCount?: number;
    pollResultDetails?: Array<Volo_CmsKit_Public_Polls_PollResultDto> | null;
};

