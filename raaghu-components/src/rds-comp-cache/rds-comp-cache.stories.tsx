import type { Meta, StoryObj } from '@storybook/react';
import RdsCompCache from "./rds-comp-cache";


const meta: Meta = { 
    title: "Components/Cache",
    component: RdsCompCache,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsCompCache>;

export default meta;
type Story = StoryObj<typeof RdsCompCache>;

export const Default: Story = {
    args: {
        cachedata: [
                    { name: "UserSettingsCache", id: 1 },
                    { name: "ZeroRolePermissions", id: 2 },
                    { name: "ZeroTenantCache", id: 3 },
                    { name: "ZeroEditionFeatures", id: 4 },
                    { name: "TenantSettingsCache", id: 5 },
                    { name: "token_validity_key", id: 6 },
                    { name: "ZeroMultiTenantLocalizationDictionaryCache", id: 7 },
                    { name: "AspNet.Identity.SecurityStamp", id: 8 },
                    { name: "TempFileCacheName", id: 9 },
                    { name: "ApplicationSettingsCache", id: 10 },
                    { name: "ZeroUserPermissions", id: 11 },
                    { name: "ZeroLanguages", id: 12 },
                ],
    }
} satisfies Story;

export const pagination: Story = {
    args: {
        cachedata: [
                    { name: "UserSettingsCache", id: 1 },
                    { name: "ZeroRolePermissions", id: 2 },
                    { name: "ZeroTenantCache", id: 3 },
                    { name: "ZeroEditionFeatures", id: 4 },
                    { name: "TenantSettingsCache", id: 5 },
                    { name: "token_validity_key", id: 6 },
                    { name: "ZeroMultiTenantLocalizationDictionaryCache", id: 7 },
                    { name: "AspNet.Identity.SecurityStamp", id: 8 },
                    { name: "TempFileCacheName", id: 9 },
                    { name: "ApplicationSettingsCache", id: 10 },
                    { name: "ZeroUserPermissions", id: 11 },
                    { name: "ZeroLanguages", id: 12 },
                ],
        recordsperpage: 5,
        pagination: true,
        alignment: "end",
    }
} satisfies Story;



