/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Payment_IPaymentRequestProductExtraParameterConfiguration } from './Volo_Payment_IPaymentRequestProductExtraParameterConfiguration';
import type { Volo_Payment_Requests_PaymentType } from './Volo_Payment_Requests_PaymentType';

export type Volo_Payment_Requests_PaymentRequestProductCreateDto = {
    code: string;
    name: string;
    unitPrice?: number;
    count?: number;
    totalPrice?: number | null;
    paymentType?: Volo_Payment_Requests_PaymentType;
    planId?: string | null;
    extraProperties?: Record<string, Volo_Payment_IPaymentRequestProductExtraParameterConfiguration> | null;
};

