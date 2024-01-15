/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_Blogging_Posts_UpdatePostDto = {
    blogId?: string;
    title: string;
    coverImage: string;
    url: string;
    content: string;
    description?: string | null;
    tags?: string | null;
    concurrencyStamp?: string | null;
};

