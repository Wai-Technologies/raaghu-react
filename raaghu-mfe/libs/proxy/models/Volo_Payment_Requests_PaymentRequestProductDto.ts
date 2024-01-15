/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Payment_Requests_PaymentType } from './Volo_Payment_Requests_PaymentType';

export type Volo_Payment_Requests_PaymentRequestProductDto = {
    paymentRequestId?: string;
    code?: string | null;
    name?: string | null;
    unitPrice?: number;
    count?: number;
    totalPrice?: number;
    paymentType?: Volo_Payment_Requests_PaymentType;
    planId?: string;
    extraProperties?: Record<string, any> | null;
};

