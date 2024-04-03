/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Blogging_Posts_BlogUserDto } from './Volo_Blogging_Posts_BlogUserDto';

export type Volo_Blogging_Comments_Dtos_CommentWithDetailsDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    isDeleted?: boolean;
    deleterId?: string | null;
    deletionTime?: string | null;
    repliedCommentId?: string | null;
    text?: string | null;
    writer?: Volo_Blogging_Posts_BlogUserDto;
    concurrencyStamp?: string | null;
};

