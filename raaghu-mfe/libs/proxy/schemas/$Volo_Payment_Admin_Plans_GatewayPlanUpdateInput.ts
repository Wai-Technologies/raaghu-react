/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Payment_Admin_Plans_GatewayPlanUpdateInput = {
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
        externalId: {
            type: 'string',
            isRequired: true,
            minLength: 1,
        },
    },
} as const;
