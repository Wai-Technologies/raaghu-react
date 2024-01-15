/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_CmsKit_Public_Comments_CreateCommentInput = {
    readonly extraProperties?: Record<string, any> | null;
    text: string;
    repliedCommentId?: string | null;
    captchaToken?: string | null;
    captchaAnswer?: number;
    url?: string | null;
    idempotencyToken: string;
};

