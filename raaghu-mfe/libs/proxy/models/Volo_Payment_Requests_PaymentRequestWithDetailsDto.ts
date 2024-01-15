/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Payment_Requests_PaymentRequestProductDto } from './Volo_Payment_Requests_PaymentRequestProductDto';
import type { Volo_Payment_Requests_PaymentRequestState } from './Volo_Payment_Requests_PaymentRequestState';

export type Volo_Payment_Requests_PaymentRequestWithDetailsDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    products?: Array<Volo_Payment_Requests_PaymentRequestProductDto> | null;
    currency?: string | null;
    state?: Volo_Payment_Requests_PaymentRequestState;
    failReason?: string | null;
    emailSendDate?: string | null;
    gateway?: string | null;
    externalSubscriptionId?: string | null;
    totalPrice?: number;
    creationTime?: string;
};

