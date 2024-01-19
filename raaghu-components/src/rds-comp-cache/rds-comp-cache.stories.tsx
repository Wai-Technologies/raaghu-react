import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompCache from "./rds-comp-cache";

export default {
    title: "Components/Cache",
    component: RdsCompCache,
    argTypes: {
        alignment: {
            options: ["start", "end"],
            control: { type: "select" },
        },

        onclick: { action: "deleted" },
    },
} as ComponentMeta<typeof RdsCompCache>;

const Template: ComponentStory<typeof RdsCompCache> = (args) => (
    <RdsCompCache {...args} />
);

export const Cache = Template.bind({});

Cache.args = {
    cachedata: [
        { name: "AbpUserSettingsCache", id: 1 },
        { name: "AbpZeroRolePermissions", id: 2 },
        { name: "AbpZeroTenantCache", id: 3 },
        { name: "AbpZeroEditionFeatures", id: 4 },
        { name: "AbpTenantSettingsCache", id: 5 },
        { name: "token_validity_key", id: 6 },
        { name: "AbpZeroMultiTenantLocalizationDictionaryCache", id: 7 },
        { name: "AspNet.Identity.SecurityStamp", id: 8 },
        { name: "TempFileCacheName", id: 9 },
        { name: "AbpApplicationSettingsCache", id: 10 },
        { name: "AbpZeroUserPermissions", id: 11 },
        { name: "AbpZeroLanguages", id: 12 },
    ],
};

export const pagination = Template.bind({});

pagination.args = {
    cachedata: [
        { name: "AbpUserSettingsCache", id: 1 },
        { name: "AbpZeroRolePermissions", id: 2 },
        { name: "AbpZeroTenantCache", id: 3 },
        { name: "AbpZeroEditionFeatures", id: 4 },
        { name: "AbpTenantSettingsCache", id: 5 },
        { name: "token_validity_key", id: 6 },
        { name: "AbpZeroMultiTenantLocalizationDictionaryCache", id: 7 },
        { name: "AspNet.Identity.SecurityStamp", id: 8 },
        { name: "TempFileCacheName", id: 9 },
        { name: "AbpApplicationSettingsCache", id: 10 },
        { name: "AbpZeroUserPermissions", id: 11 },
        { name: "AbpZeroLanguages", id: 12 },
    ],
    recordsperpage: 5,
    pagination: true,
    alignment: "end",
};
