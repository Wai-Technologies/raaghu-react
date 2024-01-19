import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsLabel from "./rds-label";

export default {
    title: "Elements/Label",
    component: RdsLabel,
    argTypes: {
        fontWeight: {
            options: [
                "black",
                "bold",
                "bolder",
                "extrabold",
                "light",
                "lighter",
                "medium",
                "normal",
                "semibold",
            ],
            control: { type: "select" },
        }
    },
} as ComponentMeta<typeof RdsLabel>;

const Template: ComponentStory<typeof RdsLabel> = (args) => (
    <RdsLabel {...args} />
);

export const Label = Template.bind({});
Label.args = {
    label: "Label",
    fontWeight: "bold",
    italic: false,
    required: false
};
