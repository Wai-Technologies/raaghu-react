/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_Http_RemoteServiceValidationErrorInfo } from './Volo_Abp_Http_RemoteServiceValidationErrorInfo';

export type Volo_Abp_Http_RemoteServiceErrorInfo = {
    code?: string | null;
    message?: string | null;
    details?: string | null;
    data?: Record<string, any> | null;
    validationErrors?: Array<Volo_Abp_Http_RemoteServiceValidationErrorInfo> | null;
};

