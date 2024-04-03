/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_CmsKit_Public_Comments_CmsUserDto } from './Volo_CmsKit_Public_Comments_CmsUserDto';
import type { Volo_CmsKit_Public_Comments_CommentDto } from './Volo_CmsKit_Public_Comments_CommentDto';

export type Volo_CmsKit_Public_Comments_CommentWithDetailsDto = {
    id?: string;
    entityType?: string | null;
    entityId?: string | null;
    text?: string | null;
    creatorId?: string;
    creationTime?: string;
    replies?: Array<Volo_CmsKit_Public_Comments_CommentDto> | null;
    author?: Volo_CmsKit_Public_Comments_CmsUserDto;
    concurrencyStamp?: string | null;
};

