/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Payment_Requests_PaymentRequestWithDetailsDto = {
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
        id: {
            type: 'string',
            format: 'uuid',
        },
        products: {
            type: 'array',
            contains: {
                type: 'Volo_Payment_Requests_PaymentRequestProductDto',
            },
            isNullable: true,
        },
        currency: {
            type: 'string',
            isNullable: true,
        },
        state: {
            type: 'Volo_Payment_Requests_PaymentRequestState',
        },
        failReason: {
            type: 'string',
            isNullable: true,
        },
        emailSendDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        gateway: {
            type: 'string',
            isNullable: true,
        },
        externalSubscriptionId: {
            type: 'string',
            isNullable: true,
        },
        totalPrice: {
            type: 'number',
            format: 'float',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
