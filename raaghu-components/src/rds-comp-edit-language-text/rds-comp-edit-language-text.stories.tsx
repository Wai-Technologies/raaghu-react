import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsCompEditLanguageText from "./rds-comp-edit-language-text";

export default {
    title: "Components/Edit Language Text",
    component: RdsCompEditLanguageText,
} as ComponentMeta<typeof RdsCompEditLanguageText>;

const Template: ComponentStory<typeof RdsCompEditLanguageText> = (args) => (
    <RdsCompEditLanguageText {...args} />
);

export const EditLanguageText = Template.bind({});

EditLanguageText.args = {};
