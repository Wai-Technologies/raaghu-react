/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Ratings_RatingDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        entityType: {
            type: 'string',
            isNullable: true,
        },
        entityId: {
            type: 'string',
            isNullable: true,
        },
        starCount: {
            type: 'number',
            format: 'int32',
        },
        creatorId: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
    },
} as const;
