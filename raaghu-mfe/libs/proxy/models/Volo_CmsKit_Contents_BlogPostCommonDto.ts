/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_CmsKit_Users_CmsUserDto } from './Volo_CmsKit_Users_CmsUserDto';

export type Volo_CmsKit_Contents_BlogPostCommonDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    blogId?: string;
    title?: string | null;
    slug?: string | null;
    shortDescription?: string | null;
    content?: string | null;
    coverImageMediaId?: string | null;
    author?: Volo_CmsKit_Users_CmsUserDto;
};

