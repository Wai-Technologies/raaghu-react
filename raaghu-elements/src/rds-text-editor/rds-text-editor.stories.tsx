import React from "react";
import RdsTextEditor from "./rds-text-editor";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Text Editor',
    component: RdsTextEditor,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        State: {
            options: [
                "Default"   ,
                "Active"  ,
                "Selected",
                "Disabled" ,
                "Error"   
            ],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsTextEditor>;

export default meta;
type Story = StoryObj<typeof RdsTextEditor>;

export const Default: Story = {
    args: {
        State: "Default",
        showTitle: true,
        label:"Label",
        isMandatory: true,
    }
} satisfies Story;
Default.parameters = { controls: { include: ['State', 'showTitle', 'label', 'isMandatory'] } };
