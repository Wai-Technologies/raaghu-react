import React from "react";
import RdsTextEditor from "./rds-text-editor";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Text Editor',
    component: RdsTextEditor,
    parameters: {
        layout: '',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsTextEditor>;

export default meta;
type Story = StoryObj<typeof RdsTextEditor>;

export const TextEditor: Story = {
    args: {
        id: "",
        value: "<p>Hello!</p>"
    }
} satisfies Story;
