import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompTypeahead from "./rds-comp-typeahead";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../.storybook/i18n";

export default {
    title: "Components /TypeAhead",
    component: RdsCompTypeahead,
    decorators: [
        (StoryComponent) => (
            <I18nextProvider i18n={i18n}>
                <StoryComponent />
            </I18nextProvider>
        ),
    ],

} as ComponentMeta<typeof RdsCompTypeahead>;


const Template: ComponentStory<typeof RdsCompTypeahead> = (args) => (
    <RdsCompTypeahead {...args} />
);


export const TypeAhead = Template.bind({});

TypeAhead.args = {
    selectItems: [
        {
            "option": "J.K Rowling",
            "value": "one"
        },
        {
            "option": "Rudyard Kipling",
            "value": "two"
        }
    ],
    label: "Authors",
    selectedItems: [
        {
            "option": "Pablo Neruda",
            "value": "three"
        },
        {
            "option": "Robin sharma",
            "value": "four"
        }
    ],
    onChange: (data: any) => {
    }
};