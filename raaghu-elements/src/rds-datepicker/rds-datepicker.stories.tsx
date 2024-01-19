import React from "react";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import RdsDatepicker, { RdsDatepickerProps } from "./rds-datepicker";


export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: "Elements/Datepicker",
    component: RdsDatepicker,
    argTypes: {
        type: {
            options: ["default", "advanced", "withTime"],
            control: { type: "radio" },
        },
    }
} as ComponentMeta<typeof RdsDatepicker>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof RdsDatepicker> = (args) => <RdsDatepicker {...args} />;

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    DatePickerLabel: "Select Date",
    type: "default"
};
export const Advanced = Template.bind({});
Advanced.args = {
    DatePickerLabel: "Select Date",
    type: "advanced"
};

export const WithTime = Template.bind({});
WithTime.args = {
  DatePickerLabel: "Select Date",
  type: "withTime",
};