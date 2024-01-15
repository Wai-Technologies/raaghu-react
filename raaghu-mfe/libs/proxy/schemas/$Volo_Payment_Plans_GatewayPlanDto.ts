/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Payment_Plans_GatewayPlanDto = {
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
        planId: {
            type: 'string',
            format: 'uuid',
        },
        gateway: {
            type: 'string',
            isNullable: true,
        },
        externalId: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
