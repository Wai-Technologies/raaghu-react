/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Payment_Admin_Plans_PlanCreateInput = {
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
        name: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
