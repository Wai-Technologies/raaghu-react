/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_CmsKit_Public_Comments_CmsUserDto } from './Volo_CmsKit_Public_Comments_CmsUserDto';

export type Volo_CmsKit_Public_Comments_CommentDto = {
    id?: string;
    entityType?: string | null;
    entityId?: string | null;
    text?: string | null;
    repliedCommentId?: string | null;
    creatorId?: string;
    creationTime?: string;
    author?: Volo_CmsKit_Public_Comments_CmsUserDto;
    concurrencyStamp?: string | null;
};

