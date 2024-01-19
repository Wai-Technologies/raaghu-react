import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsPopover from "./rds-popover";

export default {
    title: "Elements/Popover",
    component: RdsPopover,
    argTypes: {
        popoverPosition: {
            options: ["top", "bottom", "right", "left"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof RdsPopover>;

const Template: ComponentStory<typeof RdsPopover> = (args) => (
    <RdsPopover {...args} />
);

export const Popover = Template.bind({});
Popover.decorators= [
    (Story) => (
        <div style={{ padding:"200px 300px" ,
        }}>
            <Story/>
        </div>
    ),
],
Popover.args = {
    popoverPosition:"top",
    children:<p>Popover</p>,
};
