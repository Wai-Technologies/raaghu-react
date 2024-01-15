/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_CmsKit_Admin_Contact_UpdateCmsKitContactSettingDto = {
    properties: {
        receiverEmailAddress: {
            type: 'string',
            isRequired: true,
            format: 'email',
            minLength: 1,
        },
    },
} as const;
