/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_CmsKit_Blogs_BlogPostStatus } from './Volo_CmsKit_Blogs_BlogPostStatus';

export type Volo_CmsKit_Admin_Blogs_BlogPostDto = {
    id?: string;
    blogId?: string;
    title?: string | null;
    slug?: string | null;
    shortDescription?: string | null;
    content?: string | null;
    coverImageMediaId?: string | null;
    creationTime?: string;
    lastModificationTime?: string | null;
    concurrencyStamp?: string | null;
    status?: Volo_CmsKit_Blogs_BlogPostStatus;
};

