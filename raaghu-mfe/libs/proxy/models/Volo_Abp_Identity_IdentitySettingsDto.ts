/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_Identity_IdentityLockoutSettingsDto } from './Volo_Abp_Identity_IdentityLockoutSettingsDto';
import type { Volo_Abp_Identity_IdentityPasswordSettingsDto } from './Volo_Abp_Identity_IdentityPasswordSettingsDto';
import type { Volo_Abp_Identity_IdentitySignInSettingsDto } from './Volo_Abp_Identity_IdentitySignInSettingsDto';
import type { Volo_Abp_Identity_IdentityUserSettingsDto } from './Volo_Abp_Identity_IdentityUserSettingsDto';

export type Volo_Abp_Identity_IdentitySettingsDto = {
    password?: Volo_Abp_Identity_IdentityPasswordSettingsDto;
    lockout?: Volo_Abp_Identity_IdentityLockoutSettingsDto;
    signIn?: Volo_Abp_Identity_IdentitySignInSettingsDto;
    user?: Volo_Abp_Identity_IdentityUserSettingsDto;
};

