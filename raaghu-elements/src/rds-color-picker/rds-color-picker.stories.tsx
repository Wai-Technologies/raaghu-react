import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsColorPicker from "./rds-color-picker";

export default {
    title: "Elements/ColorPicker",
    component: RdsColorPicker,

} as ComponentMeta<typeof RdsColorPicker>;

const Template: ComponentStory<typeof RdsColorPicker> = (args) => (
    <RdsColorPicker {...args} />
);
                                                                                                                                                                                              
export const ColorPicker = Template.bind({});
ColorPicker.args = {
    value:"#e1e1e1",
    isDisabled:false,
    label: "Color-Picker" 
};

