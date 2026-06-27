import RdsCompTextEditor from "./rds-comp-text-editor";
import { Meta, StoryObj } from "@storybook/react-vite";
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
} satisfies Story;
Default.parameters = { controls: { include: ['State', 'showTitle', 'label', 'isMandatory','rows','resizable','placeholder'] } };
