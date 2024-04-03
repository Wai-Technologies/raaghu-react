/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Payment_Requests_PaymentRequestCreateDto = {
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
        currency: {
            type: 'string',
            isNullable: true,
        },
        products: {
            type: 'array',
            contains: {
                type: 'Volo_Payment_Requests_PaymentRequestProductCreateDto',
            },
            isNullable: true,
        },
    },
} as const;
