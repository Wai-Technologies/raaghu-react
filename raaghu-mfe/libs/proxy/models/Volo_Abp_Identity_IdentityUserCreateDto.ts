/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_Abp_Identity_IdentityUserCreateDto = {
    readonly extraProperties?: Record<string, any> | null;
    userName: string;
    name?: string | null;
    surname?: string | null;
    email: string;
    phoneNumber?: string | null;
    isActive?: boolean;
    shouldChangePasswordOnNextLogin?: boolean;
    lockoutEnabled?: boolean;
    roleNames?: Array<string> | null;
    organizationUnitIds?: Array<string> | null;
    password: string;
    sendConfirmationEmail?: boolean;
};

