/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Payment_Requests_PaymentRequestProductCreateDto } from './Volo_Payment_Requests_PaymentRequestProductCreateDto';

export type Volo_Payment_Requests_PaymentRequestCreateDto = {
    readonly extraProperties?: Record<string, any> | null;
    currency?: string | null;
    products?: Array<Volo_Payment_Requests_PaymentRequestProductCreateDto> | null;
};

