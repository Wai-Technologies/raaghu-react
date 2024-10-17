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
        id: "",
        value: "<p>Hello!</p>",
        label:"Label",
        required: true,
        State: "Default"
    }
} satisfies Story;
Default.parameters = { controls: { include: ['id','label', 'value','State','required','required'] } };

export const Active: Story = {
    args: {
        id: "",
        value: "<p>Hello!</p>",
        label:"Label",
        required: true,
        State: "Active"
    }
} satisfies Story;
Active.parameters = { controls: { include: ['id','label', 'value','State','required'] } };

export const Selected: Story = {
    args: {
        id: "",
        value: "<p>Hello!</p>",
        label:"Label",
        required: true,
        State: "Selected"
    }
} satisfies Story;
Selected.parameters = { controls: { include: ['id','label', 'value','State','required'] } };

export const Disabled: Story = {
    args: {
        id: "",
        value: "<p>Hello!</p>",
        label:"Label",
        required: true,
        State: "Disabled"
    }
} satisfies Story;
Disabled.parameters = { controls: { include: ['id','label', 'value','State','required'] } };

export const Error: Story = {
    args: {
        id: "",
        value: "<p>Hello!</p>",
        label:"Label",
        required: true,
        State: "Error"
    }
} satisfies Story;
Error.parameters = { controls: { include: ['id','label', 'value','State','required'] } };