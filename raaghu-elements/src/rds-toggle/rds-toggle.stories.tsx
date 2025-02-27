import RdsToggle, {ToggleStyle, ToggleLayout, ToggleState} from "./rds-toggle";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Elements/Toggle",
    component: RdsToggle,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
        style: {
            options: ["Style 1", "Style 2", "Style 3", "Style 4", "Style 5", "Style 6"],
            control: { type: "select" },
        },
        layout: {
            options: ["Switch + Label", "Label + Switch", "Top Label + Switch", "Bottom Label + Switch"],
            control: { type: "select" },
        },
        state: {
            options: ["On", "Off", "Disabled On", "Disabled Off"],
            control: { type: "select" },
        },
    },
} satisfies Meta<typeof RdsToggle>;

export default meta;
type Story = StoryObj<typeof RdsToggle>;

export const Default: Story = {
    args: {
        style: ToggleStyle.Style1,
        layout: ToggleLayout.SwitchLabel,
        state:ToggleState.On,
        showLabel:true,
        label:"Label"
    }
} satisfies Story;

Default.parameters = { controls: { include: [ "style", "layout", "state", "showLabel", "label"] } };
