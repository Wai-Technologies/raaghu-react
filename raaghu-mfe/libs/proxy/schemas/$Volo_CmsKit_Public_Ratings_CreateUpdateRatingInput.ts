/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Public_Ratings_CreateUpdateRatingInput = {
    properties: {
        starCount: {
            type: 'number',
            isRequired: true,
            format: 'int32',
            maximum: 5,
            minimum: 1,
        },
    },
} as const;
