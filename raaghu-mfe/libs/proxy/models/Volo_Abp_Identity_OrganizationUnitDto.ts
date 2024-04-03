/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_Identity_OrganizationUnitRoleDto } from './Volo_Abp_Identity_OrganizationUnitRoleDto';

export type Volo_Abp_Identity_OrganizationUnitDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    isDeleted?: boolean;
    deleterId?: string | null;
    deletionTime?: string | null;
    parentId?: string | null;
    code?: string | null;
    displayName?: string | null;
    roles?: Array<Volo_Abp_Identity_OrganizationUnitRoleDto> | null;
};

