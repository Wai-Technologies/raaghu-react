import React from "react";
import RdsCompTextEditor from "./rds-comp-text-editor";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';

const meta: Meta = {
    title: 'Components/Text Editor',
    component: RdsCompTextEditor,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
    },
    tags: ['autodocs', 'stable'],
    argTypes: {
        className: { control: 'text', description: 'CSS class applied to the text editor root.' },
        sx: { control: 'object', description: 'MUI system styles applied to the text editor root.' },
        ref: { control: false, description: 'React ref to the text editor root; assign it in code.' },
        State: {
            options: [
                "Default"   ,
                "Active"  ,
                "Selected",
                "Disabled" ,
                "Error"   
            ],
            control: { type: "select" },
            description: "State of the text editor",
        },
    },
} satisfies Meta<typeof RdsCompTextEditor>;

export default meta;
type Story = StoryObj<typeof RdsCompTextEditor>;

export const Default: Story = {
    args: {
        State: "Default",
        showTitle: true,
        label:"Label",
        required: false,
        rows:6,
        resizable:false,
        placeholder:"Enter Description"
    },
    play: async ({ canvasElement }) => {
        const editor = canvasElement.querySelector('[contenteditable="true"], .ql-editor, .ProseMirror') || canvasElement.firstElementChild;
        expect(editor).toBeTruthy();
    },
} satisfies Story;
Default.parameters = { controls: { include: ['State', 'showTitle', 'label', 'required','rows','resizable','placeholder','className','sx','ref'] } };
