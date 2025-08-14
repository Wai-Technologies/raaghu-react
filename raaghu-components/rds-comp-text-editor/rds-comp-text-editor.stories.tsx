import React from "react";
import RdsCompTextEditor from "./rds-comp-text-editor";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
    title: 'Components/Text Editor',
    component: RdsCompTextEditor,
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
} satisfies Meta<typeof RdsCompTextEditor>;

export default meta;
type Story = StoryObj<typeof RdsCompTextEditor>;

export const Standard: Story = {
    args: {
        State: "Default",
        showTitle: true,
        label:"Label",
        isMandatory: true,
    }
} satisfies Story;
Standard.parameters = { controls: { include: ['State', 'showTitle', 'label', 'isMandatory'] } };
