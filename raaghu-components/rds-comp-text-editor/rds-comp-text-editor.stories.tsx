import RdsCompTextEditor from "./rds-comp-text-editor";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from 'storybook/test';

const meta: Meta = {
    title: 'Components/Text Editor',
    component: RdsCompTextEditor,
    parameters: {
            status: { type: 'stable' },
        layout: 'padded',
    },
    tags: ['autodocs', 'stable'],
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
        isMandatory: false,
        rows:6,
        resizable:false,
        placeholder:"Enter Description"
    },
    play: async ({ canvasElement }) => {
        const editor = canvasElement.querySelector('[contenteditable="true"], .ql-editor, .ProseMirror') || canvasElement.firstElementChild;
        expect(editor).toBeTruthy();
    },
} satisfies Story;
Default.parameters = { controls: { include: ['State', 'showTitle', 'label', 'isMandatory','rows','resizable','placeholder'] } };
