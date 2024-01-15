/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Payment_Requests_PaymentRequestStartDto = {
    properties: {
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isReadOnly: true,
            isNullable: true,
        },
        paymentRequestId: {
            type: 'string',
            format: 'uuid',
        },
        returnUrl: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        cancelUrl: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
