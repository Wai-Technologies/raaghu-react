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
        disabled: {
            control: { type: "boolean" },
            description: "Disables the editor",
            table: { defaultValue: { summary: "false" } },
        },
        selected: {
            control: { type: "boolean" },
            description: "Shows the editor in its selected style",
            table: { defaultValue: { summary: "false" } },
        },
        error: {
            control: { type: "boolean" },
            description: "Shows the editor in its error style",
            table: { defaultValue: { summary: "false" } },
        },
        active: {
            control: { type: "boolean" },
            description: "Shows the editor in its active (focused) style",
            table: { defaultValue: { summary: "false" } },
        },
        State: { table: { disable: true } },
    },
} satisfies Meta<typeof RdsCompTextEditor>;

export default meta;
type Story = StoryObj<typeof RdsCompTextEditor>;

export const Default: Story = {
    args: {
        disabled: false,
        selected: false,
        error: false,
        active: false,
        showTitle: true,
        label:"Label",
        isMandatory: false,
        rows:6,
        resizable:false,
        placeholder:"Enter Description"
    },
} satisfies Story;
Default.parameters = { controls: { include: ['disabled', 'selected', 'error', 'active', 'showTitle', 'label', 'isMandatory','rows','resizable','placeholder'] } };
