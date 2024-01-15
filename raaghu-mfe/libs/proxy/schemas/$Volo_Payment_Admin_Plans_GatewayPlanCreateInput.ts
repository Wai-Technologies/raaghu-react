/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Payment_Admin_Plans_GatewayPlanCreateInput = {
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
        gateway: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
        externalId: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
    },
} as const;
