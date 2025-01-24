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


export const CustomColorPicker: Story = {
    args: {
        value: "#e1e1e1",
        isDisabled: false,
        label: "Color-Picker"
    }
} satisfies Story;
CustomColorPicker.parameters = { controls: { include: ['value', 'label', 'isDisabled'] } };


