/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Menus_MenuItemCreateInput = {
    properties: {
        parentId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        displayName: {
            type: 'string',
            isRequired: true,
        },
        isActive: {
            type: 'boolean',
        },
        url: {
            type: 'string',
            isNullable: true,
        },
        icon: {
            type: 'string',
            isNullable: true,
        },
        order: {
            type: 'number',
            format: 'int32',
        },
        target: {
            type: 'string',
            isNullable: true,
        },
        elementId: {
            type: 'string',
            isNullable: true,
        },
        cssClass: {
            type: 'string',
            isNullable: true,
        },
        pageId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
