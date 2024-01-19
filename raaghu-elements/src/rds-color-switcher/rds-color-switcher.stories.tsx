import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsColorSwitcher from "./rds-color-switcher";

export default {
    title: "Elements/Color Switcher",
    component: RdsColorSwitcher,
    argTypes: {
        displayType: {
            options: ["rounded", "square"],
            control: { type: "select" }
        }
    }
} as ComponentMeta<typeof RdsColorSwitcher>;

const Template: ComponentStory<typeof RdsColorSwitcher> = (args) => (
    <RdsColorSwitcher {...args} />
);
                                                                                                                                                                                              
export const ColorSwitcher = Template.bind({});
ColorSwitcher.args = {
    displayType:"rounded",
    header: "Color",
    defaultValue: 1,
    itemList: [
        { id: 1, color: "#FFFFFF" },
        { id: 2, color: "#FDD2FF" },
        { id: 3, color: "#BFEAFF" },
    ]
};

