import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompTenantInformation from "./rds-comp-tenant-information";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Tenant Information",
    component: RdsCompTenantInformation,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],
} as ComponentMeta<typeof RdsCompTenantInformation>;

const Template: ComponentStory<typeof RdsCompTenantInformation> = (args) => (
    <RdsCompTenantInformation {...args} />
);

export const TenantInformation = Template.bind({});

TenantInformation.args = {
    editionList: [
        {
            option: "Not assigned",
        },
        {
            option: "Standard",
        },
        {
            option: "apple",
        },
        {
            option: "Apple1",
        },
    ],

};
