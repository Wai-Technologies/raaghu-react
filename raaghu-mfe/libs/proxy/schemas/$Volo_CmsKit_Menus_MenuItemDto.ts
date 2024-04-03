/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Menus_MenuItemDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastModifierId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        parentId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        displayName: {
            type: 'string',
            isNullable: true,
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
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
