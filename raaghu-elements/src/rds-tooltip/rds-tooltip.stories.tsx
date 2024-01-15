import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tooltip from "./rds-tooltip";

export default {
    title: "Elements/Tooltip",
    component: Tooltip,
    argTypes: {
        place: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "radio" },
        },
    },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
    <Tooltip {...args} />
);

export const tooltip = Template.bind({});
tooltip.decorators = [
    (Story) => (
        <div className="align-items-center d-flex justify-content-center vh-100">
            <Story />
        </div>
    ),
],
tooltip.args = {
        text: "This is tooltip",
        place: "right",
        children: <button className="btn btn-primary" >Button</button>
    };
