
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompNewClaimType from "./rds-comp-new-claim-type";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components/New Claim Type",
    component: RdsCompNewClaimType,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],

} as ComponentMeta<typeof RdsCompNewClaimType>;


const Template: ComponentStory<typeof RdsCompNewClaimType> = (args) => (
    <RdsCompNewClaimType {...args} />
);

export const NewClaimType = Template.bind({});

NewClaimType.args = {
    name: "",
    regex: "",
    value: "",
    regexDesc: "",
    desc: "",
    onSubmit: { undefined },
    valueType: [
        {
            option: "One",
            value: "one"
        },
        {
            option: "two",
            value: "two"
        },
        {
            option: "three",
            value: "three"
        },
        {
            option: "four",
            value: "four"
        }

    ]
};

