/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Docs_Documents_DocumentContributorDto } from './Volo_Docs_Documents_DocumentContributorDto';
import type { Volo_Docs_Projects_ProjectDto } from './Volo_Docs_Projects_ProjectDto';

export type Volo_Docs_Documents_DocumentWithDetailsDto = {
    name?: string | null;
    version?: string | null;
    languageCode?: string | null;
    fileName?: string | null;
    content?: string | null;
    format?: string | null;
    editLink?: string | null;
    rootUrl?: string | null;
    rawRootUrl?: string | null;
    localDirectory?: string | null;
    creationTime?: string;
    lastUpdatedTime?: string;
    lastCachedTime?: string;
    project?: Volo_Docs_Projects_ProjectDto;
    contributors?: Array<Volo_Docs_Documents_DocumentContributorDto> | null;
};

