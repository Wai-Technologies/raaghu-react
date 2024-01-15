/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Payment_Requests_PaymentRequestProductDto = {
    properties: {
        paymentRequestId: {
            type: 'string',
            format: 'uuid',
        },
        code: {
            type: 'string',
            isNullable: true,
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        unitPrice: {
            type: 'number',
            format: 'float',
        },
        count: {
            type: 'number',
            format: 'int32',
        },
        totalPrice: {
            type: 'number',
            format: 'float',
        },
        paymentType: {
            type: 'Volo_Payment_Requests_PaymentType',
        },
        planId: {
            type: 'string',
            format: 'uuid',
        },
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isNullable: true,
        },
    },
} as const;
