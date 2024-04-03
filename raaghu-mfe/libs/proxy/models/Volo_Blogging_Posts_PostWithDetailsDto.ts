/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Blogging_Posts_BlogUserDto } from './Volo_Blogging_Posts_BlogUserDto';
import type { Volo_Blogging_Tagging_Dtos_TagDto } from './Volo_Blogging_Tagging_Dtos_TagDto';

export type Volo_Blogging_Posts_PostWithDetailsDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    isDeleted?: boolean;
    deleterId?: string | null;
    deletionTime?: string | null;
    blogId?: string;
    title?: string | null;
    coverImage?: string | null;
    url?: string | null;
    content?: string | null;
    description?: string | null;
    readCount?: number;
    commentCount?: number;
    writer?: Volo_Blogging_Posts_BlogUserDto;
    tags?: Array<Volo_Blogging_Tagging_Dtos_TagDto> | null;
    concurrencyStamp?: string | null;
};

