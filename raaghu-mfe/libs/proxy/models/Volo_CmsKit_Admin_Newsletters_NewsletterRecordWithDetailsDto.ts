/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_CmsKit_Admin_Newsletters_NewsletterPreferenceDto } from './Volo_CmsKit_Admin_Newsletters_NewsletterPreferenceDto';

export type Volo_CmsKit_Admin_Newsletters_NewsletterRecordWithDetailsDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    emailAddress?: string | null;
    preferences?: Array<Volo_CmsKit_Admin_Newsletters_NewsletterPreferenceDto> | null;
    creationTime?: string;
};

