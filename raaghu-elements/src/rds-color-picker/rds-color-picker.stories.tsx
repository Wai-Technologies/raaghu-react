import RdsColorPicker from "./rds-color-picker";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
    title: 'Elements/Color Picker',
    component: RdsColorPicker,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
    },
} satisfies Meta<typeof RdsColorPicker>;

export default meta;
type Story = StoryObj<typeof RdsColorPicker>;

export const basic: Story = {
    args: {
        value: "#e1e1e1",
        isDisabled: false,
        label: "basic Color-Picker",
        storyType: "basic"
    }
} satisfies Story;

export const hex: Story = {
    args: {
        value: "#e1e1e1",
        isDisabled: false,
        label: "Hex Color-Picker",
        storyType: "hex"
    }
} satisfies Story;

export const rgba: Story = {
    args: {
        value: "#FF5733", // Red color as default
        isDisabled: true,  // Disabled state
        label: "rgba Color Picker",
        storyType: "rgba"
    },
} satisfies Story;
export const hsl: Story = {
    args: {
        value: "#FF5733", // Red color as default
        isDisabled: true,  // Disabled state
        label: "hsl Color Picker",
        storyType: "hsl"
    },
} satisfies Story;


basic.parameters = { controls: { include: ['value', 'label', 'isDisabled'] } };
hex.parameters = { controls: { include: ['value', 'label', 'isDisabled'] } };
rgba.parameters = { controls: { include: ['value', 'label', 'isDisabled'] } };
hsl.parameters = { controls: { include: ['value', 'label', 'isDisabled'] } };

