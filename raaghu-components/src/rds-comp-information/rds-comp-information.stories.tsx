import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompInformation from "./rds-comp-information";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/Information",
    component: RdsCompInformation,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],
} as ComponentMeta<typeof RdsCompInformation>;

const Template: ComponentStory<typeof RdsCompInformation> = (args) => (
    <RdsCompInformation {...args} />
);

export const Information = Template.bind({});

Information.args = {
    inputTypeList: [
        {
            label: "One",
        },
        {
            label: "two",
        },
        {
            label: "three",
        },
        {
            label: "four",
        },
    ],
    informationItemInitial: {
        propertyName: "demo",
        displayName: "demo",
        inputValue: "demo",
    },

    reset: false,
};
