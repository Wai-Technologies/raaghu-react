/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_FileManagement_Files_FileIconInfo } from './Volo_FileManagement_Files_FileIconInfo';

export type Volo_FileManagement_Directories_DirectoryContentDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    name?: string | null;
    isDirectory?: boolean;
    size?: number;
    iconInfo?: Volo_FileManagement_Files_FileIconInfo;
    concurrencyStamp?: string | null;
};

