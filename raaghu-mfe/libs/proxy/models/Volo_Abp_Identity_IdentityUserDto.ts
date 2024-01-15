/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_Abp_Identity_IdentityUserDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    tenantId?: string | null;
    userName?: string | null;
    email?: string | null;
    name?: string | null;
    surname?: string | null;
    emailConfirmed?: boolean;
    phoneNumber?: string | null;
    phoneNumberConfirmed?: boolean;
    supportTwoFactor?: boolean;
    twoFactorEnabled?: boolean;
    isActive?: boolean;
    lockoutEnabled?: boolean;
    isLockedOut?: boolean;
    lockoutEnd?: string | null;
    shouldChangePasswordOnNextLogin?: boolean;
    concurrencyStamp?: string | null;
    roleNames?: Array<string> | null;
    accessFailedCount?: number;
    lastPasswordChangeTime?: string | null;
};

