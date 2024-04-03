/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Payment_Requests_PaymentRequestProductCreateDto = {
    properties: {
        code: {
            type: 'string',
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        unitPrice: {
            type: 'number',
            format: 'float',
        },
        count: {
            type: 'number',
            format: 'int32',
            maximum: 2147483647,
            minimum: 1,
        },
        totalPrice: {
            type: 'number',
            isNullable: true,
            format: 'float',
        },
        paymentType: {
            type: 'Volo_Payment_Requests_PaymentType',
        },
        planId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        extraProperties: {
            type: 'dictionary',
            contains: {
                type: 'Volo_Payment_IPaymentRequestProductExtraParameterConfiguration',
            },
            isNullable: true,
        },
    },
} as const;
