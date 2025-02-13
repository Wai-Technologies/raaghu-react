import RdsToggle from "./rds-toggle";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: "Elements/Toggle",
    component: RdsToggle,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
        layout: {
            options: ["Switch + label", "label + Switch", "Top label + Switch", "Bottom label + Switch"],
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
        style: "Style 1",
        layout: "Switch + label",
        state:"On",
        showLabel:true,
        label:"Label"
    }
} satisfies Story;

Default.parameters = { controls: { include: [ "style", "layout", "state", "showLabel", "label"] } };
