/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_Abp_Account_RegisterDto = {
    readonly extraProperties?: Record<string, any> | null;
    userName: string;
    emailAddress: string;
    password: string;
    appName: string;
    returnUrl?: string | null;
    returnUrlHash?: string | null;
    captchaResponse?: string | null;
};

