import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompProperties from "./rds-comp-properties";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Properties",
    component: RdsCompProperties,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],


} as ComponentMeta<typeof RdsCompProperties>;


const Template: ComponentStory<typeof RdsCompProperties> = (args) =>
    <RdsCompProperties {...args} />;


export const Properties = Template.bind({});

Properties.args = {
    propertyHeaders: [
        { displayName: "Member", key: "member", datatype: "avatarTitleInfo", sortable: false },
        { displayName: "Cases", key: "cases", datatype: "number", sortable: false, },
        { displayName: "Active", key: "active", datatype: "number", sortable: false },
        { displayName: "Closed", key: "closed", datatype: "number", sortable: false },
        { displayName: "Rate", key: "rate", datatype: "number", sortable: false },
    ],
    propertyData: [
        {
            "cases": 10,
            "member": { avatar: "https://anzstageui.raaghu.io/assets/profile-picture-circle.svg", title: "Brian", info: "Software Developer" },
            "active": 38,
            "closed": 10,
            "rate": 92,
        },
        {
            "cases": 18,
            "member": { avatar: "https://anzstageui.raaghu.io/assets/profile-picture-circle.svg", title: "Brian", info: "Software Developer" },
            "active": 342,
            "closed": 25,
            "rate": 42
        },
        {
            "cases": 7,
            "member": { avatar: "https://anzstageui.raaghu.io/assets/profile-picture-circle.svg", title: "Brian", info: "Software Developer" },
            "active": 25,
            "closed": 5,
            "rate": 96
        },
        {
            "cases": 14,
            "member": { avatar: "https://anzstageui.raaghu.io/assets/profile-picture-circle.svg", title: "Brian", info: "Software Developer" },
            "active": 42,
            "closed": 42,
            "rate": 16
        }
    ]
};



